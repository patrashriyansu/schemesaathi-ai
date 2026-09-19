import React, { useState, useEffect } from 'react'
import { Filter, Search, UserCheck } from 'lucide-react'
import { getSchemes } from '../services/api'
import { useSession } from '../App'
import SchemeCard from '../components/SchemeCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function SchemeRecommendations() {
  const { sessionId, hasProfile } = useSession()
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [filters, setFilters] = useState({
    category: '',
    government_level: '',
    search: '',
    useProfileMatch: hasProfile
  })

  const fetchSchemes = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {}
      if (filters.category) params.category = filters.category
      if (filters.government_level) params.government_level = filters.government_level
      if (filters.search) params.query = filters.search   // backend uses 'query' not 'search'
      // session_id not yet supported by /api/schemes endpoint

      const res = await getSchemes(params)
      setSchemes(res.data.schemes || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : typeof err === 'string' ? err : 'Failed to load schemes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSchemes()
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [filters])

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scheme Recommendations</h1>
          <p className="text-gray-600">Discover and filter government schemes available for you.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search schemes by name or keywords..."
              className="pl-10 input-field"
            />
          </div>
          
          <div>
            <select name="category" value={filters.category} onChange={handleFilterChange} className="input-field">
              <option value="">All Categories</option>
              <option value="Education">Education</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Health">Health</option>
              <option value="Employment">Employment</option>
              <option value="Housing">Housing</option>
            </select>
          </div>
          
          <div>
            <select name="government_level" value={filters.government_level} onChange={handleFilterChange} className="input-field">
              <option value="">All Levels</option>
              <option value="Central">Central Govt</option>
              <option value="State">State Govt</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <label className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
            filters.useProfileMatch 
              ? 'bg-primary-50 text-primary-700 border border-primary-200' 
              : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
          }`}>
            <input 
              type="checkbox" 
              name="useProfileMatch" 
              checked={filters.useProfileMatch} 
              onChange={handleFilterChange}
              className="sr-only"
              disabled={!hasProfile}
            />
            <UserCheck className="w-4 h-4" />
            <span className="text-sm font-medium">Personalize for My Profile</span>
          </label>
          
          {!hasProfile && (
            <p className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded border border-yellow-200">
              Create a profile to enable personalized matching.
            </p>
          )}

          <div className="text-sm text-gray-500 font-medium">
            {loading ? 'Searching...' : `Showing ${schemes.length} schemes`}
          </div>
        </div>
      </div>

      {/* Results Area */}
      {error && <ErrorMessage message={error} onRetry={fetchSchemes} />}
      
      {!error && loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-64 animate-pulse flex flex-col">
              <div className="flex gap-2 mb-4">
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
                <div className="h-5 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-auto flex gap-3">
                <div className="h-10 w-full bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && !loading && schemes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No schemes found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {!error && !loading && schemes.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, idx) => (
            <SchemeCard 
              key={scheme.id || idx}
              scheme={scheme}
              matchScore={scheme.match_score}
              eligibilityStatus={scheme.eligibility_status}
            />
          ))}
        </div>
      )}
    </div>
  )
}
