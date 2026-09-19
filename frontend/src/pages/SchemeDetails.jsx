import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Landmark, Share2, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { getScheme, getSchemeDocuments, checkEligibility } from '../services/api'
import { useSession } from '../App'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import DemoDataBanner from '../components/DemoDataBanner'
import DocumentChecklist from '../components/DocumentChecklist'

export default function SchemeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { sessionId } = useSession()
  
  const [scheme, setScheme] = useState(null)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [schemeRes, docsRes] = await Promise.all([
          getScheme(id),
          getSchemeDocuments(id)
        ])
        setScheme(schemeRes.data)
        setDocuments(docsRes.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <LoadingSpinner fullScreen />
  if (error) return <ErrorMessage message={error} />
  if (!scheme) return <ErrorMessage message="Scheme not found" />

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility Criteria' },
    { id: 'documents', label: 'Required Documents' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to schemes
      </button>

      {scheme.is_demo_data && <DemoDataBanner />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-primary-50 text-primary-700">
                  {scheme.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-800">
                  <Landmark className="w-3.5 h-3.5" /> {scheme.government_level}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{scheme.name}</h1>
              <p className="text-gray-600 leading-relaxed text-lg">{scheme.description}</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[120px] py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600 bg-primary-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Key Benefits</h3>
                    <p className="text-gray-600 leading-relaxed">{scheme.benefits || 'Benefits information not available.'}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Implementing Department</h3>
                    <p className="text-gray-600">{scheme.department || 'Not specified'}</p>
                  </div>
                </div>
              )}

              {activeTab === 'eligibility' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">General Eligibility Criteria</h3>
                  <div className="prose prose-sm text-gray-600 max-w-none">
                    <p>This scheme is generally available to citizens who meet the following requirements based on our records:</p>
                    {/* Placeholder for raw criteria display if needed */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <h4 className="font-semibold text-blue-900 mb-2">Want to know if YOU qualify?</h4>
                      <p className="text-sm text-blue-800 mb-4">Our AI can analyze your profile against this scheme's specific rules.</p>
                      <Link to={`/schemes/${id}/eligibility`} className="btn-primary text-sm inline-flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Check My Eligibility Now
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Required Documents</h3>
                  <p className="text-gray-600 mb-6 text-sm">You will generally need the following documents to apply for this scheme. Check your personal Document Center to see what you already have.</p>
                  <DocumentChecklist checklist={documents.map(d => ({ name: d.display_name, description: d.notes, available: false, is_mandatory: d.is_mandatory }))} />
                  <div className="mt-6">
                    <Link to="/documents" className="text-primary-600 text-sm font-medium hover:underline">
                      Go to My Document Center →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Ready to Apply?</h3>
            <div className="space-y-4">
              <Link 
                to={`/schemes/${id}/eligibility`}
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Check My Eligibility
              </Link>
              <Link 
                to={`/application/${id}`}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Start Application Guide
              </Link>
            </div>

            {scheme.official_application_url ? (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <a 
                  href={scheme.official_application_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Visit Official Portal <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Official portal link pending verification
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Quick Info</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Scheme ID</dt>
                <dd className="font-medium text-gray-900 font-mono mt-0.5">{scheme.id}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Last Verified</dt>
                <dd className="font-medium text-gray-900 mt-0.5">Recently Updated</dd>
              </div>
              <div>
                <dt className="text-gray-500">Managed By</dt>
                <dd className="font-medium text-gray-900 mt-0.5">{scheme.government_level} Government</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
