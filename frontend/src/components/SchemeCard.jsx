import React from 'react'
import { Link } from 'react-router-dom'
import { Landmark, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react'
import EligibilityBadge from './EligibilityBadge'
import ProgressBar from './ProgressBar'

export default function SchemeCard({ scheme, matchScore, eligibilityStatus }) {
  const { id, name, description, category, government_level, is_demo } = scheme

  const categoryColors = {
    'Education': 'bg-blue-100 text-blue-800',
    'Agriculture': 'bg-green-100 text-green-800',
    'Health': 'bg-red-100 text-red-800',
    'Housing': 'bg-yellow-100 text-yellow-800',
    'Employment': 'bg-purple-100 text-purple-800',
    'Default': 'bg-gray-100 text-gray-800'
  }

  const catColor = categoryColors[category] || categoryColors['Default']

  return (
    <div className="card flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${catColor}`}>
            {category}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            <Landmark className="w-3 h-3" />
            {government_level}
          </span>
        </div>
        {is_demo && (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">
            <ShieldAlert className="w-3 h-3" /> Demo
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight" title={name}>
        {name}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
        {description}
      </p>

      {matchScore !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-gray-700">Match Score</span>
            <span className="font-bold text-primary-600">{matchScore}%</span>
          </div>
          <ProgressBar progress={matchScore} />
        </div>
      )}

      {eligibilityStatus && (
        <div className="mb-4">
          <EligibilityBadge status={eligibilityStatus} />
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
        <Link 
          to={`/schemes/${id}`}
          className="flex-1 btn-secondary text-center text-sm py-2 px-3"
        >
          View Details
        </Link>
        <Link 
          to={`/schemes/${id}/eligibility`}
          className="flex-1 btn-primary text-center text-sm py-2 px-3 flex items-center justify-center gap-1"
        >
          <CheckCircle2 className="w-4 h-4" /> Check
        </Link>
      </div>
    </div>
  )
}
