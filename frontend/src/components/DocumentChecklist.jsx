import React from 'react'
import { CheckCircle2, XCircle, Upload, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar'

export default function DocumentChecklist({ checklist = [] }) {
  const total = checklist.length
  const ready = checklist.filter(d => d.available).length
  const progress = total > 0 ? Math.round((ready / total) * 100) : 0

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Document Readiness</h3>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">{ready} of {total} documents ready</span>
          <span className="font-medium text-gray-900">{progress}%</span>
        </div>
        <ProgressBar progress={progress} color={progress === 100 ? 'bg-green-500' : 'bg-primary-500'} />
      </div>

      <ul className="divide-y divide-gray-100">
        {checklist.map((doc, idx) => (
          <li key={idx} className="p-4 flex items-start gap-3">
            <div className="mt-0.5">
              {doc.available ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div className="flex-grow">
              <p className={`font-medium text-sm ${doc.available ? 'text-gray-900' : 'text-gray-700'}`}>
                {doc.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
            </div>
            {!doc.available && (
              <Link
                to="/documents"
                className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-2 py-1 rounded"
              >
                <Upload className="w-3.5 h-3.5" /> Upload
              </Link>
            )}
          </li>
        ))}
      </ul>
      
      {checklist.length === 0 && (
        <div className="p-6 text-center text-gray-500 text-sm">
          No documents specified for this scheme yet.
        </div>
      )}

      <div className="p-3 bg-yellow-50 border-t border-yellow-100 flex gap-2 items-start text-xs text-yellow-800">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>This checklist is AI-generated based on scheme guidelines. Official requirements may vary slightly.</p>
      </div>
    </div>
  )
}
