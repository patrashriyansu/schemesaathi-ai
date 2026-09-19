import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, FileText, Search, MessageSquare, ChevronRight, User } from 'lucide-react'
import { useSession } from '../App'
import { getApplications, getSchemes } from '../services/api'
import StatusBadge from '../components/StatusBadge'
import SchemeCard from '../components/SchemeCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Dashboard() {
  const { sessionId, profile, hasProfile } = useSession()
  const [applications, setApplications] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appsRes, schemesRes] = await Promise.all([
          getApplications(sessionId),
          getSchemes({ session_id: sessionId, limit: 3 })
        ])
        setApplications(appsRes.data)
        setRecommendations((schemesRes.data.schemes || []).slice(0, 3)) // Only take top 3
      } catch (err) {
        console.error("Dashboard error", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [sessionId])

  if (loading) return <LoadingSpinner fullScreen />

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {profile?.name ? profile.name.split(' ')[0] : 'Citizen'}
          </h1>
          <p className="text-gray-600 mt-1">Here's your scheme application overview.</p>
        </div>
        {!hasProfile && (
          <Link to="/profile" className="btn-primary text-sm flex items-center gap-2">
            <User className="w-4 h-4" /> Complete Profile
          </Link>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Matches Found</p>
            <p className="text-2xl font-bold text-gray-900">{hasProfile ? recommendations.length * 3 : 0}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Apps Started</p>
            <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Docs Ready</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">AI Chats</p>
            <p className="text-2xl font-bold text-gray-900">1</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: My Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900 text-lg">My Applications Tracker</h2>
            </div>
            
            {applications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>You haven't started any applications yet.</p>
                <Link to="/schemes" className="text-primary-600 font-medium hover:underline mt-2 inline-block">
                  Find schemes to apply for →
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <li key={app.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{app.scheme_id}</h3>
                        <p className="text-xs text-gray-500">Updated: {new Date(app.updated_at).toLocaleDateString()}</p>
                        {app.reference_number && (
                          <p className="text-xs font-mono bg-gray-100 px-2 py-1 rounded inline-block mt-2">
                            Ref: {app.reference_number}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col sm:items-end gap-3">
                        <StatusBadge status={app.status} />
                        <Link to={`/application/${app.scheme_id}`} className="text-sm font-medium text-primary-600 flex items-center hover:underline">
                          View Guide <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Quick Actions & Recommendations */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/schemes" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-4 group-hover:bg-white">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Find More Schemes</h3>
                  <p className="text-xs text-gray-500">Discover new programs</p>
                </div>
              </Link>
              <Link to="/documents" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4 group-hover:bg-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Upload Documents</h3>
                  <p className="text-xs text-gray-500">Prepare for applications</p>
                </div>
              </Link>
              <Link to="/assistant" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-4 group-hover:bg-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Chat with AI</h3>
                  <p className="text-xs text-gray-500">Get instant answers</p>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900 text-lg">Top Matches for You</h2>
              <Link to="/schemes" className="text-sm font-medium text-primary-600 hover:underline">See all</Link>
            </div>
            <div className="space-y-4">
              {recommendations.length > 0 ? recommendations.map(scheme => (
                <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{scheme.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {scheme.match_score || 85}% Match
                    </span>
                    <Link to={`/schemes/${scheme.id}`} className="text-xs font-medium text-gray-600 hover:text-primary-600">
                      View Details →
                    </Link>
                  </div>
                </div>
              )) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-sm text-gray-500">
                  {hasProfile ? 'No recommendations found yet.' : 'Complete your profile to see recommendations.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
