import React from 'react'
import { AlertOctagon, RefreshCw } from 'lucide-react'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto my-8">
      <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertOctagon className="w-6 h-6 text-red-600" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-5">{message || 'An unexpected error occurred. Please try again later.'}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      )}
    </div>
  )
}
