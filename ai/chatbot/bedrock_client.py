import json
import logging
import re
from typing import Optional, Dict, Any, List
from app.config import get_settings
from app.schemas.chat import ChatResponse, ExtractedProfile

logger = logging.getLogger(__name__)

INDIAN_STATES = [
    "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh",
    "goa", "gujarat", "haryana", "himachal pradesh", "jharkhand", "karnataka",
    "kerala", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram",
    "nagaland", "odisha", "punjab", "rajasthan", "sikkim", "tamil nadu",
    "telangana", "tripura", "uttar pradesh", "uttarakhand", "west bengal",
    "delhi", "jammu and kashmir", "ladakh"
]

def extract_profile_from_text(text: str) -> Dict[str, Any]:
    """Rule-based profile extraction from natural language."""
    extracted = {}
    text_lower = text.lower()

    # Age
    age_match = re.search(r'(\b\d{1,3})\s*(?:year[s]?\s*old|yr[s]?\s*old|years\s*of\s*age|age)', text_lower)
    if age_match:
        age = int(age_match.group(1))
        if 0 <= age <= 120:
            extracted['age'] = age

    # Income
    income_patterns = [
        r'(\d+(?:\.\d+)?)\s*lakh',
        r'rs\.?\s*(\d+(?:,\d+)*)',
        r'income\s*(?:is|of|around|about)?\s*(?:rs\.?)?\s*(\d+(?:,\d+)*)'
    ]
    for pattern in income_patterns:
        match = re.search(pattern, text_lower)
        if match:
            val_str = match.group(1).replace(',', '')
            val = float(val_str)
            if 'lakh' in text_lower[match.start():match.start()+30]:
                val *= 100000
            extracted['annual_income'] = val
            break

    # State
    for state in INDIAN_STATES:
        if state in text_lower:
            extracted['state'] = state.title()
            break

    # Gender
    if any(w in text_lower for w in ['female', 'woman', 'women', 'girl', 'lady']):
        extracted['gender'] = 'female'
    elif any(w in text_lower for w in ['male', 'man', 'boy', 'he ', ' he,', 'his ']):
        if 'gender' not in extracted:
            extracted['gender'] = 'male'

    # Student
    if any(w in text_lower for w in ['student', 'studying', 'school', 'college', 'university']):
        extracted['is_student'] = True

    # Farmer
    if any(w in text_lower for w in ['farmer', 'farming', 'agriculture', 'kisan', 'krishi']):
        extracted['is_farmer'] = True

    # Rural/Urban
    if 'rural' in text_lower or 'village' in text_lower or 'gram' in text_lower:
        extracted['area_type'] = 'rural'
    elif 'urban' in text_lower or 'city' in text_lower:
        extracted['area_type'] = 'urban'

    # BPL
    if 'bpl' in text_lower or 'below poverty' in text_lower:
        extracted['is_bpl'] = True

    # Disability
    if any(w in text_lower for w in ['disability', 'disabled', 'differently abled', 'divyangjan']):
        extracted['has_disability'] = True

    return extracted


def detect_language(text: str) -> str:
    hindi_chars = re.findall(r'[\u0900-\u097F]', text)
    odia_chars = re.findall(r'[\u0B00-\u0B7F]', text)
    if len(odia_chars) > 2:
        return 'or'
    if len(hindi_chars) > 2:
        return 'hi'
    return 'en'


MOCK_RESPONSES = [
    "I can help you discover government schemes you may be eligible for. Could you tell me your age, state, and approximate annual family income?",
    "Thank you for sharing that. To find more relevant schemes, could you also tell me — are you a student, farmer, or do you have any disability status?",
    "Based on what you've shared, I'm searching through the scheme database for relevant programs. What specific area are you looking for help in — education, healthcare, housing, or employment?",
    "I've noted your details. Let me check which government schemes match the criteria you've mentioned. Are you from a rural or urban area?",
]
_mock_idx = 0


def get_mock_response(message: str, history: list, profile_ctx: dict) -> ChatResponse:
    global _mock_idx
    extracted = extract_profile_from_text(message)
    response_text = MOCK_RESPONSES[_mock_idx % len(MOCK_RESPONSES)]
    _mock_idx += 1

    missing = []
    if not profile_ctx.get('age') and 'age' not in extracted:
        missing.append('age')
    if not profile_ctx.get('state') and 'state' not in extracted:
        missing.append('state')
    if not profile_ctx.get('annual_income') and 'annual_income' not in extracted:
        missing.append('annual family income')

    if extracted and missing:
        missing_str = ', '.join(missing)
        response_text = f"Thank you for sharing that information. To help find the most relevant schemes, could you also provide your {missing_str}?"
    elif extracted and not missing:
        response_text = "I've gathered enough information to search for schemes. Let me look up the most relevant government programs for you based on your profile."

    lang = detect_language(message)
    ep = ExtractedProfile(**{k: v for k, v in extracted.items() if k in ExtractedProfile.model_fields})

    return ChatResponse(
        message=response_text,
        extracted_profile=ep if extracted else None,
        language_detected=lang,
        is_mock=True
    )


def get_bedrock_response(message: str, history: list, profile_ctx: dict, language: str) -> ChatResponse:
    settings = get_settings()
    if settings.use_mock_ai or not settings.is_aws_configured:
        return get_mock_response(message, history, profile_ctx)

    try:
        import boto3
        bedrock = boto3.client(
            'bedrock-runtime',
            region_name=settings.aws_region,
            aws_access_key_id=settings.aws_access_key_id or None,
            aws_secret_access_key=settings.aws_secret_access_key or None,
            aws_session_token=settings.aws_session_token or None
        )

        from ai.prompts.system_prompt import build_system_prompt
        system_prompt = build_system_prompt(language)

        messages = []
        for h in history[-10:]:
            messages.append({"role": h.role, "content": h.content})
        messages.append({"role": "user", "content": message})

        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1024,
            "system": system_prompt,
            "messages": messages
        })

        response = bedrock.invoke_model(
            modelId=settings.aws_bedrock_model_id,
            body=body,
            contentType='application/json',
            accept='application/json'
        )
        result = json.loads(response['body'].read())
        assistant_msg = result['content'][0]['text']

        extracted = extract_profile_from_text(message)
        lang = detect_language(message)
        ep = ExtractedProfile(**{k: v for k, v in extracted.items() if k in ExtractedProfile.model_fields}) if extracted else None

        return ChatResponse(
            message=assistant_msg,
            extracted_profile=ep,
            language_detected=lang,
            is_mock=False
        )
    except Exception as e:
        logger.error(f"Bedrock call failed: {e}. Falling back to mock.")
        return get_mock_response(message, history, profile_ctx)
