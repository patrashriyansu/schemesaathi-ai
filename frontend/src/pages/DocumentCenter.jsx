import React, { useState, useCallback } from 'react'
import { UploadCloud, FileText, CheckCircle2, ShieldAlert, Loader2, Search } from 'lucide-react'

export default function DocumentCenter() {
  const [isDragging, setIsDragging] = useState(false)
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhaar_Card.pdf', type: 'Identity Proof', date: '2023-10-15', status: 'analyzed' },
    { id: 2, name: 'Income_Certificate_2023.pdf', type: 'Income Proof', date: '2023-11-02', status: 'analyzed' }
  ]) // Mock existing documents
  const [uploading, setUploading] = useState(false)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files) => {
    // Mock upload process
    setUploading(true)
    setTimeout(() => {
      const newDoc = {
        id: Date.now(),
        name: files[0].name,
        type: 'Processing...',
        date: new Date().toISOString().split('T')[0],
        status: 'processing'
      }
      setDocuments(prev => [newDoc, ...prev])
      setUploading(false)
      
      // Mock analysis completion
      setTimeout(() => {
        setDocuments(prev => prev.map(d => 
          d.id === newDoc.id ? { ...d, type: 'Address Proof', status: 'analyzed' } : d
        ))
      }, 3000)
    }, 1500)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Center</h1>
        <p className="text-gray-600">Securely upload and manage documents for your scheme applications.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 text-sm text-blue-800 mb-8">
        <ShieldAlert className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="font-semibold mb-1">Privacy & Security First</p>
          <p>Documents are processed securely to verify application readiness. Raw document contents are never displayed publicly. <span className="font-semibold text-yellow-600 ml-2">Note: Running in mock mode.</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Zone */}
        <div className="lg:col-span-1">
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {uploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <UploadCloud className="w-8 h-8" />}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Document</h3>
            <p className="text-sm text-gray-500 mb-6">Drag and drop your file here, or click to browse.</p>
            
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={handleFileInput}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label 
              htmlFor="file-upload" 
              className="btn-secondary w-full cursor-pointer inline-flex items-center justify-center"
            >
              Select File
            </label>
            <p className="text-xs text-gray-400 mt-4">Supported: PDF, JPEG, PNG (Max 10MB)</p>
          </div>
        </div>

        {/* Document List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900">Your Documents</h3>
              <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                {documents.length} Files
              </span>
            </div>
            
            {documents.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>No documents uploaded yet.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <li key={doc.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm truncate max-w-[200px] sm:max-w-xs">{doc.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs">
                          <span className="text-gray-500">{doc.date}</span>
                          <span className={`px-2 py-0.5 rounded font-medium ${
                            doc.status === 'analyzed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {doc.status === 'analyzed' ? doc.type : 'Analyzing...'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full sm:w-auto">
                      {doc.status === 'analyzed' ? (
                        <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors flex items-center justify-center gap-2">
                          <Search className="w-4 h-4" /> View Details
                        </button>
                      ) : (
                        <button disabled className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                          <Loader2 className="w-4 h-4 animate-spin" /> Processing
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
