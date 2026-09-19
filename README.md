# 🇮🇳 SchemeSaathi AI

> **Empowering Indian Citizens to Discover, Understand, and Apply for Government Schemes They Qualify For.**

[![GitHub Pages Deployment](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?logo=github)](https://patrashriyansu.github.io/schemesaathi-ai/)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/patrashriyansu/schemesaathi-ai)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/patrashriyansu/schemesaathi-ai&root-directory=frontend)

---

## 🌟 Key Features

- 🎯 **Intelligent Eligibility Engine**: Evaluates criteria with beneficiary context (applicant vs child/family).
- 💬 **Multilingual AI Assistant**: Conversational assistant in English, Hindi, and Odia that extracts user profile details.
- 📋 **Personalized Scheme Discovery**: Search and filter central and state schemes.
- 📁 **Document Readiness & Checklist**: Instant verification checklist of required documents before applying.
- 🗺️ **Step-by-Step Application Guide**: Direct links to verified official government portals.

---

## 🚀 Instant Deployment

### 1. Frontend (GitHub Pages)
Automatically deployed via GitHub Actions:
👉 **[https://patrashriyansu.github.io/schemesaathi-ai/](https://patrashriyansu.github.io/schemesaathi-ai/)**

### 2. Backend (Render - 1 Click)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/patrashriyansu/schemesaathi-ai)

### 3. Frontend (Vercel - 1 Click)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/patrashriyansu/schemesaathi-ai&root-directory=frontend)

---

## 🛠️ Local Development

### Backend (FastAPI)
`ash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed.py
uvicorn app.main:app --reload --port 8000
`

### Frontend (React + Vite)
`ash
cd frontend
npm install
npm run dev
`

---

## 📄 License
MIT
