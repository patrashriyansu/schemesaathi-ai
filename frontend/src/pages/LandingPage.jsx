import React from 'react'
import { Link } from 'react-router-dom'
import { Search, ShieldCheck, FileCheck, CheckCircle2, Languages, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-primary-500" />,
      title: 'Personalized Discovery',
      description: 'Find schemes that match your unique profile, income, and background instantly.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
      title: 'Explainable Eligibility',
      description: 'Understand exactly why you qualify for a scheme with AI-driven transparent reasoning.'
    },
    {
      icon: <FileCheck className="w-8 h-8 text-saffron-500" />,
      title: 'Document Readiness',
      description: 'Know exactly what documents you need before starting the application process.'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-blue-500" />,
      title: 'Official Channels',
      description: 'Always directed to verified government portals for secure applications.'
    }
  ]

  const steps = [
    { num: 1, title: 'Create Profile', desc: 'Answer a few simple questions about yourself.' },
    { num: 2, title: 'Discover Schemes', desc: 'Our AI finds government schemes you qualify for.' },
    { num: 3, title: 'Check Eligibility', desc: 'See exactly why you match and what you need.' },
    { num: 4, title: 'Apply Safely', desc: 'Follow our guide to apply on official portals.' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Tricolor Header Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-saffron-500 via-white to-india-green"></div>

      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:pt-32 lg:pb-40 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl mb-6">
          Find Government Schemes<br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-saffron-500">
            You May Qualify For
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 mb-10">
          SchemeSaathi AI helps citizens discover relevant government welfare programs, explains eligibility simply, and prepares you to apply.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/profile" className="btn-primary text-lg flex items-center justify-center gap-2 px-8 py-3.5">
            Find My Schemes <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/assistant" className="btn-secondary text-lg px-8 py-3.5">
            Chat with AI Assistant
          </Link>
        </div>

        {/* Stats Row */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center gap-8 sm:gap-16 flex-wrap">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">12+</p>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Schemes</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-1">
              <Languages className="w-6 h-6 text-primary-500" /> 3
            </p>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Languages</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">100%</p>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Free to use</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Use SchemeSaathi AI?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <div className="w-10 h-10 mx-auto bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & Disclaimer */}
      <footer className="mt-auto py-8 bg-gray-900 text-gray-400 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <p className="mb-4 font-semibold text-gray-300">
            ⚠ SchemeSaathi AI does not guarantee eligibility or process applications.
          </p>
          <p className="text-sm">
            This platform uses AI to match your profile against publicly available scheme guidelines for informational purposes. 
            Always verify eligibility and submit applications through official government sources.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-800 text-xs">
            &copy; {new Date().getFullYear()} SchemeSaathi AI. Built for the citizens of India.
          </div>
        </div>
      </footer>
    </div>
  )
}
