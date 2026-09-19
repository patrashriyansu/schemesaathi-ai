import React, { useState, useEffect, useRef } from 'react'
import { Send, Trash2, Bot, Languages, Info, ShieldAlert } from 'lucide-react'
import { useSession } from '../App'
import { sendChat } from '../services/api'
import ChatBubble from '../components/ChatBubble'

export default function AIAssistant() {
  const { sessionId } = useSession()
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am SchemeSaathi AI. Tell me about yourself (e.g., age, occupation, income, state) or ask me about government schemes, and I can help you find what you qualify for.' }
  ])
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState('english')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await sendChat({
        session_id: sessionId,
        message: userMessage,
        language: language
      })
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.message,
        extractedProfile: response.data.extracted_profile 
      }])
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, I encountered an error connecting to the server. Please try again.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([{ role: 'assistant', content: 'Chat history cleared. How can I help you today?' }])
    }
  }

  const starterMessages = [
    "I am a 22 year old student from Odisha",
    "Tell me about farmer schemes",
    "I need education scholarship help"
  ]

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bot className="w-7 h-7 text-primary-600" /> AI Assistant
          </h1>
          <p className="text-sm text-gray-600 mt-1">Talk to me in English, Hindi, or Odia.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm">
            <Languages className="w-4 h-4 text-gray-500 mr-2" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="odia">Odia</option>
            </select>
          </div>
          <button 
            onClick={handleClear}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
            title="Clear Chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex gap-3 text-sm text-blue-800">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>I can extract your profile details from our conversation to find schemes automatically. You don't need to fill forms manually!</p>
      </div>

      <div className="flex-grow bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden relative">
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto bg-gray-50">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} />
          ))}
          {loading && <ChatBubble isTyping={true} />}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="absolute bottom-24 left-0 right-0 px-6 hidden sm:flex justify-center gap-3">
            {starterMessages.map((msg, idx) => (
              <button
                key={idx}
                onClick={() => setInput(msg)}
                className="bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 text-xs px-4 py-2 rounded-full shadow-sm transition-colors whitespace-nowrap"
              >
                {msg}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="w-full pl-5 pr-14 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <ShieldAlert className="w-3.5 h-3.5" /> AI can make mistakes. Verify important information.
          </div>
        </div>
      </div>
    </div>
  )
}
