import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import AIAssistant from './pages/AIAssistant'
import SchemeRecommendations from './pages/SchemeRecommendations'
import SchemeDetails from './pages/SchemeDetails'
import EligibilityExplanation from './pages/EligibilityExplanation'
import DocumentCenter from './pages/DocumentCenter'
import ApplicationGuide from './pages/ApplicationGuide'
import Dashboard from './pages/Dashboard'
import WakeUpBanner from './components/WakeUpBanner'
import { getProfile } from './services/api'

// Global session context
export const SessionContext = createContext(null)

export function useSession() {
  return useContext(SessionContext)
}

function generateSessionId() {
  return 'ss_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-red-200 rounded-2xl shadow-sm text-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-600 mb-4">{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
            className="btn-primary text-sm px-4 py-2"
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem('ss_session_id') || generateSessionId()
  })
  const [profile, setProfile] = useState(null)
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    localStorage.setItem('ss_session_id', sessionId)
    if (sessionId) {
      getProfile(sessionId)
        .then(res => {
          if (res.data) {
            setProfile(res.data)
            setHasProfile(true)
          }
        })
        .catch(() => {})
    }
  }, [sessionId])

  return (
    <SessionContext.Provider value={{ sessionId, profile, setProfile, hasProfile, setHasProfile }}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <WakeUpBanner />
          <main className="flex-grow">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/assistant" element={<AIAssistant />} />
                <Route path="/schemes" element={<SchemeRecommendations />} />
                <Route path="/schemes/:id" element={<SchemeDetails />} />
                <Route path="/schemes/:id/eligibility" element={<EligibilityExplanation />} />
                <Route path="/documents" element={<DocumentCenter />} />
                <Route path="/application/:id" element={<ApplicationGuide />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ErrorBoundary>
          </main>
        </div>
      </BrowserRouter>
    </SessionContext.Provider>
  )
}
