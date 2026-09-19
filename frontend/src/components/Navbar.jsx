import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, Home, Search, MessageSquare, FileText, LayoutDashboard } from 'lucide-react'
import { useSession } from '../App'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { hasProfile } = useSession()

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Find Schemes', path: '/schemes', icon: <Search className="w-4 h-4" /> },
    { name: 'AI Assistant', path: '/assistant', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Documents', path: '/documents', icon: <FileText className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-500 via-white to-india-green border border-gray-200 flex items-center justify-center">
                <span className="text-india-blue font-bold text-sm">SAI</span>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">SchemeSaathi <span className="text-primary-600">AI</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/profile"
              className={`flex items-center gap-2 ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                hasProfile 
                  ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50' 
                  : 'bg-saffron-500 text-white hover:bg-saffron-600'
              }`}
            >
              <User className="w-4 h-4" />
              {hasProfile ? 'My Profile' : 'Complete Profile'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <User className="w-5 h-5" />
              My Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
