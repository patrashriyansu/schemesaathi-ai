import React from 'react'
import { Bot, User, ShieldAlert, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ChatBubble({ message, isTyping = false }) {
  const isUser = message?.role === 'user'
  
  if (isTyping) {
    return (
      <div className="flex gap-3 mb-4 justify-start">
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-primary-600" />
        </div>
        <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-5 h-5 text-primary-600" />
        </div>
      )}
      
      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
        isUser 
          ? 'bg-primary-600 text-white rounded-tr-sm' 
          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
      }`}>
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        
        {!isUser && message.extractedProfile && Object.entries(message.extractedProfile).some(([_, val]) => val !== null && val !== undefined && val !== '') && (
          <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-green-800 mb-2">
              <Check className="w-4 h-4" /> Profile Updated Automatically
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              {Object.entries(message.extractedProfile)
                .filter(([_, val]) => val !== null && val !== undefined && val !== '')
                .map(([key, value]) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="font-medium capitalize w-24 flex-shrink-0">{key.replace(/_/g, ' ')}:</span>
                    <span className="font-bold">{String(value)}</span>
                  </li>
                ))}
            </ul>
            <div className="mt-2 pt-2 border-t border-green-200">
              <Link to="/profile" className="text-xs font-medium text-primary-600 hover:underline">
                Review Full Profile →
              </Link>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
          <User className="w-5 h-5 text-gray-600" />
        </div>
      )}
    </div>
  )
}
