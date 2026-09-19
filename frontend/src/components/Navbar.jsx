import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, Home, Search, MessageSquare, FileText, LayoutDashboard, Cloud, Wifi } from 'lucide-react'
import { useSession } from '../App'
import { getHealth } from '../services/api'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [cloudStatus, setCloudStatus] = useState('checking') // 'checking' | 'online' | 'waking'
  const location = useLocation()
  const { hasProfile } = useSession()

  useEffect(() => {
    let mounted = true
    const check = async () => {
      try {
        await getHealth()
        if (mounted) setCloudStatus('online')
      } catch {
        if (mounted) setCloudStatus('waking')
      }
    }
    check()
    const timer = setInterval(check, 25000)
    return () => {
      mounted = false
      clearInterval(timer)
    }
  }, [])

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
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-saffron-500 via-amber-500 to-india-green border border-amber-200 flex items-center justify-center shadow-sm">
                <span className="text-white font-extrabold text-sm tracking-tighter">SAI</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-gray-900 tracking-tight leading-none">
                  SchemeSaathi <span className="text-primary-600">AI</span>
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                  Govt Schemes Assistant 🇮🇳
                </span>
              </div>
            </Link>

            {/* Cloud 24/7 Status Badge */}
            <div
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                cloudStatus === 'online'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : cloudStatus === 'waking'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}
              title="SchemeSaathi runs 24/7 in the cloud even when your PC is turned off"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  cloudStatus === 'online'
                    ? 'bg-emerald-500 animate-pulse'
                    : cloudStatus === 'waking'
                    ? 'bg-amber-500 animate-ping'
                    : 'bg-gray-400'
                }`}
              />
              <span>{cloudStatus === 'online' ? 'Cloud 24/7' : cloudStatus === 'waking' ? 'Waking...' : 'Connecting...'}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/profile"
              className={`flex items-center gap-1.5 ml-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                hasProfile
                  ? 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-gray-400'
                  : 'bg-saffron-500 text-white hover:bg-saffron-600 hover:shadow-saffron-500/20'
              }`}
            >
              <User className="w-4 h-4" />
              {hasProfile ? 'My Profile' : 'Complete Profile'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                cloudStatus === 'online'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${cloudStatus === 'online' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
              {cloudStatus === 'online' ? 'Online' : 'Waking'}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-semibold ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 mt-3 px-4 py-3 rounded-lg text-base font-bold bg-saffron-500 text-white hover:bg-saffron-600 shadow-sm"
            >
              <User className="w-5 h-5" />
              {hasProfile ? 'View Profile' : 'Start My Profile'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
