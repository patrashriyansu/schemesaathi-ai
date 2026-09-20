# 🇮🇳 SchemeSaathi AI

### AI-Powered Government Scheme Discovery & Application Assistant

> **Empowering Indian citizens to discover government schemes they may be eligible for, understand eligibility requirements, prepare the required documents, and apply through verified official channels.**

<p align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-SchemeSaathi-brightgreen?style=for-the-badge\&logo=github)](https://patrashriyansu.github.io/schemesaathi-ai/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge\&logo=github)](https://github.com/patrashriyansu/schemesaathi-ai)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#-license)

</p>

---

## 📌 Problem

India has thousands of central and state government welfare schemes, but many citizens struggle to:

* Find schemes relevant to their situation
* Understand complex eligibility criteria
* Determine whether a scheme applies to themselves or a family member
* Identify the documents required for application
* Understand the application process
* Find the correct official government portal

This creates an information gap between **government schemes and the citizens they are designed to support**.

---

## 💡 Our Solution

**SchemeSaathi AI** is an intelligent citizen-assistance platform that simplifies government scheme discovery.

Instead of manually searching through multiple government websites, users can provide basic information about themselves or their family through a conversational interface.

SchemeSaathi then helps users:

**Understand → Discover → Check Eligibility → Prepare Documents → Apply**

The platform is designed to provide information and direct users to **official government application channels**.

---

# ✨ Key Features

### 🎯 1. Intelligent Eligibility Engine

Evaluates scheme eligibility using the applicant's profile and scheme-specific criteria.

The engine supports contextual situations such as:

* Applicant applying for themselves
* Parent applying for a child
* Family-based eligibility
* Income-based criteria
* Age requirements
* Gender-specific schemes
* Occupation-based schemes
* State and location requirements

---

### 🤖 2. Multilingual AI Assistant

Users can interact with the assistant in:

* 🇬🇧 English
* 🇮🇳 Hindi
* 🟠 Odia

The conversational assistant can collect relevant information such as:

```text
Age
State
District
Annual Income
Occupation
Gender
Education
Family Details
Category
Other Scheme-Specific Information
```

This information can then be used to identify potentially relevant schemes.

---

### 🔎 3. Personalized Scheme Discovery

Users can discover schemes based on their profile instead of searching through large government databases manually.

Features include:

* Scheme search
* Category filtering
* State-based filtering
* Eligibility filtering
* Personalized recommendations
* Central government schemes
* State government schemes

---

### 📋 4. Eligibility Breakdown

Instead of simply displaying **Eligible / Not Eligible**, SchemeSaathi explains the criteria.

Example:

```text
✅ Age Requirement
You satisfy the required age criteria.

✅ Income Requirement
Your reported annual income is within the specified limit.

❌ State Requirement
This scheme is currently available only in selected states.
```

This helps citizens understand **why** a scheme may or may not apply to them.

---

### 📁 5. Document Readiness Checklist

Before starting an application, users can see the documents they may need.

Example:

```text
☑ Aadhaar Card
☑ Income Certificate
☑ Bank Account Details
☐ Caste Certificate
☐ Residence Certificate
```

This helps users prepare their documents before visiting the official application portal.

---

### 🗺️ 6. Step-by-Step Application Guide

SchemeSaathi provides a simplified application workflow:

```text
1. Understand the scheme
        ↓
2. Check eligibility
        ↓
3. Review required documents
        ↓
4. Open official application portal
        ↓
5. Complete the application
        ↓
6. Submit through the official channel
```

Where available, users are directed to the relevant **official government website or application portal**.

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────────┐
                    │        Citizen          │
                    │  Web / Mobile Browser   │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     React Frontend      │
                    │       + Vite            │
                    └────────────┬────────────┘
                                 │
                         REST API Requests
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      FastAPI Backend    │
                    │                         │
                    │  Authentication         │
                    │  Scheme APIs            │
                    │  Eligibility Engine     │
                    │  Recommendation Logic   │
                    │  AI Assistant           │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
      ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
      │ Scheme Data  │   │ Eligibility  │   │ AI / NLP    │
      │   Database   │   │    Engine    │   │   Assistant  │
      └──────────────┘   └──────────────┘   └──────────────┘
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 ▼
                    ┌─────────────────────────┐
                    │ Official Scheme Links  │
                    │ & Application Portals  │
                    └─────────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose               |
| ---------- | --------------------- |
| React.js   | User interface        |
| Vite       | Frontend build tool   |
| JavaScript | Application logic     |
| CSS        | Responsive styling    |
| REST API   | Backend communication |

## Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Python     | Backend development |
| FastAPI    | REST API framework  |
| Pydantic   | Data validation     |
| Uvicorn    | ASGI server         |

## AI & Intelligence

| Component            | Purpose                           |
| -------------------- | --------------------------------- |
| AI Assistant         | Conversational interaction        |
| NLP                  | Extract user information          |
| Eligibility Engine   | Rule-based eligibility evaluation |
| Recommendation Logic | Personalized scheme discovery     |

## Deployment

| Platform     | Component                       |
| ------------ | ------------------------------- |
| GitHub Pages | Frontend                        |
| Render       | Backend                         |
| Vercel       | Alternative frontend deployment |

---

# 📂 Project Structure

```text
schemesaathi-ai/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── seed.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .github/
│   └── workflows/
│
├── README.md
└── LICENSE
```

---

# 🚀 Live Demo

### 🌐 Frontend

**SchemeSaathi AI**

https://patrashriyansu.github.io/schemesaathi-ai/

### 💻 GitHub Repository

https://github.com/patrashriyansu/schemesaathi-ai

---

# ⚡ Quick Start

## 1. Clone the Repository

```bash
git clone https://github.com/patrashriyansu/schemesaathi-ai.git

cd schemesaathi-ai
```

---

# 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Seed the database:

```bash
python seed.py
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend will be available at:

```text
http://localhost:8000
```

FastAPI documentation:

```text
http://localhost:8000/docs
```

---

# 💻 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🚀 Deployment

## GitHub Pages

The frontend can be deployed automatically using GitHub Actions.

Live deployment:

```text
https://patrashriyansu.github.io/schemesaathi-ai/
```

---

## Render

The FastAPI backend can be deployed using Render.

Configure the backend service with the appropriate:

```text
Build Command
pip install -r requirements.txt

Start Command
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

## Vercel

The React frontend can also be deployed through Vercel.

Set the frontend directory as:

```text
frontend
```

and use:

```text
npm install
npm run build
```

---

# 🔐 Security & Trust

SchemeSaathi is designed with citizen safety and information reliability in mind.

### Key principles

* 🔒 Avoid exposing sensitive user information unnecessarily
* 🌐 Direct users toward official application channels
* 🛡️ Do not claim government affiliation unless officially authorized
* 📌 Clearly distinguish informational guidance from official decisions
* 🔗 Prefer verified official government links for applications

> **SchemeSaathi AI is an informational assistance platform. Final eligibility and application approval are determined by the relevant government authority.**

---

# 🎯 Target Users

SchemeSaathi can assist:

* 👨‍👩‍👧 Families
* 🎓 Students
* 👩 Women
* 👨‍🌾 Farmers
* 💼 Workers
* 🏠 Low-income households
* ♿ Persons with disabilities
* 👴 Senior citizens
* 🏘️ Rural communities
* 🇮🇳 Citizens looking for government welfare programs

---

# 🌍 Vision

Our vision is to make government welfare information **accessible, understandable, and actionable** for every citizen.

Instead of asking:

> **"Which government schemes are available?"**

citizens should be able to ask:

> **"Which schemes may apply to my situation, what do I need, and where can I apply?"**

SchemeSaathi AI aims to bridge that gap through **AI, multilingual interaction, personalized discovery, and transparent eligibility guidance.**

---

# 🔮 Future Roadmap

### Phase 1 — Current

* [x] Scheme discovery
* [x] Eligibility evaluation
* [x] Multilingual assistant
* [x] Document checklist
* [x] Application guidance
* [x] Responsive web interface

### Phase 2

* [ ] Voice-based interaction
* [ ] More Indian languages
* [ ] Advanced document verification
* [ ] Improved recommendation engine
* [ ] Personalized citizen dashboard

### Phase 3

* [ ] Government data-source integrations
* [ ] Real-time scheme updates
* [ ] Mobile application
* [ ] Accessibility improvements
* [ ] Offline / low-connectivity support

---

# 🏆 Hackathon Project

**SchemeSaathi AI** was developed as an AI-powered civic technology solution to simplify access to government welfare information.

### Core Workflow

```text
USER PROFILE
     ↓
AI ASSISTANT
     ↓
SCHEME DISCOVERY
     ↓
ELIGIBILITY ENGINE
     ↓
ELIGIBILITY EXPLANATION
     ↓
DOCUMENT CHECKLIST
     ↓
APPLICATION GUIDE
     ↓
OFFICIAL GOVERNMENT PORTAL
```

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add: your feature"
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📜 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

---

## 🇮🇳 SchemeSaathi AI

**Discover. Understand. Prepare. Apply.**

> **Technology should not make citizens search harder. It should make government services easier to understand.**
