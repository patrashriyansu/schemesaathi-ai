import React from 'react'
import { Clock, AlertCircle, CheckCircle, FileText, Send } from 'lucide-react'

export default function StatusBadge({ status }) {
  const map = {
    'not_started': { color: 'bg-gray-100 text-gray-800', label: 'Not Started', icon: Clock },
    'documents_missing': { color: 'bg-yellow-100 text-yellow-800', label: 'Documents Missing', icon: AlertCircle },
    'ready_to_apply': { color: 'bg-blue-100 text-blue-800', label: 'Ready to Apply', icon: CheckCircle },
    'application_started': { color: 'bg-orange-100 text-orange-800', label: 'Application Started', icon: FileText },
    'submitted': { color: 'bg-green-100 text-green-800', label: 'Submitted', icon: Send }
  }

  const current = map[status] || map['not_started']
  const Icon = current.icon

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${current.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {current.label}
    </span>
  )
}
