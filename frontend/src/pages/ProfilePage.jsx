import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, User, Loader2, AlertCircle } from 'lucide-react'
import { useProfile } from '../hooks/useProfile'
import ProgressBar from '../components/ProgressBar'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { profile, loading: profileLoading, saveProfile } = useProfile()
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    state: 'Maharashtra',
    district: '',
    area_type: 'urban',
    annual_income: '',
    occupation: '',
    education_level: '10th Pass',
    is_student: false,
    is_farmer: false,
    has_disability: false,
    disability_type: '',
    is_bpl: false,
    caste_category: 'general',
    has_aadhaar: false,
    has_bank_account: false,
    preferred_language: 'en'
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Calculate completion percentage
  const calculateCompletion = () => {
    const required = ['name', 'age', 'gender', 'state', 'district', 'area_type', 'annual_income', 'occupation', 'education_level', 'caste_category']
    const filled = required.filter(key => formData[key] !== '' && formData[key] !== null).length
    return Math.round((filled / required.length) * 100)
  }

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        ...profile
      }))
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      // Convert numbers
      const dataToSave = {
        ...formData,
        age: formData.age ? parseInt(formData.age, 10) : null,
        annual_income: formData.annual_income ? parseFloat(formData.annual_income) : null
      }
      
      await saveProfile(dataToSave)
      setSuccess(true)
      setTimeout(() => {
        navigate('/schemes')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (profileLoading && !profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      </div>
    )
  }

  const completion = calculateCompletion()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <User className="w-6 h-6 text-primary-600" /> My Profile
        </h1>
        <p className="text-gray-600 mt-1">Complete your profile to discover schemes you qualify for.</p>
        
        <div className="mt-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Profile Completion</span>
            <span className="font-bold text-primary-600">{completion}%</span>
          </div>
          <ProgressBar progress={completion} color={completion === 100 ? 'bg-green-500' : 'bg-primary-500'} />
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3 border border-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-lg flex items-start gap-3 border border-green-200">
          <div className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600 rounded-full border-2 border-green-600 flex items-center justify-center font-bold text-xs">✓</div>
          <p>Profile saved successfully! Finding your schemes...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Basic Info */}
          <div className="md:col-span-2 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Enter your full name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Age</label>
                  <input required type="number" name="age" value={formData.age} onChange={handleChange} className="input-field" placeholder="e.g. 25" min="0" max="120" />
                </div>
                <div>
                  <label className="label">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="md:col-span-2 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location &amp; Demographics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="label">State</label>
                <select name="state" value={formData.state} onChange={handleChange} className="input-field">
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
              <div>
                <label className="label">District</label>
                <input required type="text" name="district" value={formData.district} onChange={handleChange} className="input-field" placeholder="Enter district" />
              </div>
              <div>
                <label className="label">Area Type</label>
                <select name="area_type" value={formData.area_type} onChange={handleChange} className="input-field">
                  <option value="urban">Urban</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
            </div>
          </div>

          {/* Socio-Economic */}
          <div className="md:col-span-2 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Socio-Economic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Annual Family Income (₹)</label>
                <input required type="number" name="annual_income" value={formData.annual_income} onChange={handleChange} className="input-field" placeholder="e.g. 250000" />
                {formData.annual_income && (
                  <p className="text-xs text-gray-500 mt-1">
                    ₹ {(Number(formData.annual_income) / 100000).toFixed(2)} Lakhs
                  </p>
                )}
              </div>
              <div>
                <label className="label">Caste Category</label>
                <select name="caste_category" value={formData.caste_category} onChange={handleChange} className="input-field">
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC (Scheduled Caste)</option>
                  <option value="st">ST (Scheduled Tribe)</option>
                </select>
              </div>
              <div>
                <label className="label">Education Level</label>
                <select name="education_level" value={formData.education_level} onChange={handleChange} className="input-field">
                  <option value="Below 10th">Below 10th</option>
                  <option value="10th Pass">10th Pass</option>
                  <option value="12th Pass">12th Pass</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>
              <div>
                <label className="label">Occupation</label>
                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="input-field" placeholder="e.g. Student, Farmer, Business" />
              </div>
            </div>
          </div>

          {/* Specific Categories */}
          <div className="md:col-span-2 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Specific Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" name="is_student" checked={formData.is_student} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500" />
                <span className="font-medium text-gray-700">I am a Student</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" name="is_farmer" checked={formData.is_farmer} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500" />
                <span className="font-medium text-gray-700">I am a Farmer</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" name="is_bpl" checked={formData.is_bpl} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500" />
                <span className="font-medium text-gray-700">Below Poverty Line (BPL)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" name="has_disability" checked={formData.has_disability} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500" />
                <span className="font-medium text-gray-700">Person with Disability</span>
              </label>
            </div>
            
            {formData.has_disability && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="label">Disability Type / Percentage</label>
                <input type="text" name="disability_type" value={formData.disability_type} onChange={handleChange} className="input-field bg-white" placeholder="e.g. Visual Impairment 40%" />
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents & Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" name="has_aadhaar" checked={formData.has_aadhaar} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500" />
                <span className="font-medium text-gray-700">Have Aadhaar Card</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" name="has_bank_account" checked={formData.has_bank_account} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500" />
                <span className="font-medium text-gray-700">Have Bank Account</span>
              </label>
              <div>
                <select name="language_preference" value={formData.language_preference} onChange={handleChange} className="input-field">
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Odia">Odia</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 px-8"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? 'Saving...' : 'Save Profile & Find Schemes'}
          </button>
        </div>
      </form>
    </div>
  )
}
