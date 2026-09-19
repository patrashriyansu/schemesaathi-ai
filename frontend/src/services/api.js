import axios from 'axios'

// Render backend URL — hardcoded production fallback
const RENDER_BACKEND = 'https://schemesaathi-backend-9r0z.onrender.com'

// Priority: VITE_API_URL env var → Render backend (prod) → /api proxy (local dev only)
const isLocalDev = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : isLocalDev
    ? '/api'
    : `${RENDER_BACKEND}/api`

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  res => res,
  err => {
    const raw = err.response?.data?.detail || err.response?.data?.error || err.message || 'An unexpected error occurred.'
    const message = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw.map(e => e.msg || JSON.stringify(e)).join(', ') : JSON.stringify(raw)
    return Promise.reject(new Error(message))
  }
)

// Profile
export const createProfile = (data) => api.post('/profile', data)
export const getProfile = (sessionId) => api.get(`/profile/${sessionId}`)
export const updateProfile = (sessionId, data) => api.put(`/profile/${sessionId}`, data)

// Schemes
export const getSchemes = (params) => api.get('/schemes', { params })
export const getScheme = (id) => api.get(`/schemes/${id}`)
export const getSchemeDocuments = (id) => api.get(`/schemes/${id}/documents`)
export const getApplicationGuide = (id) => api.get(`/schemes/${id}/application`)

// Eligibility
export const checkEligibility = (data) => api.post('/eligibility/check', data)

// Chat
export const sendChat = (data) => api.post('/chat', data)

// Documents
export const uploadDocument = (formData) => api.post('/documents/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
export const analyzeDocument = (docId) => api.post(`/documents/analyze/${docId}`)
export const getDocumentChecklist = (sessionId, schemeId) =>
  api.get(`/documents/checklist/${sessionId}/${schemeId}`)

// Applications
export const getApplications = (sessionId) => api.get(`/applications/${sessionId}`)
export const startApplication = (sessionId, schemeId) =>
  api.post('/applications/start', null, { params: { session_id: sessionId, scheme_id: schemeId } })
export const updateApplicationStatus = (appId, status, refNum) =>
  api.put(`/applications/${appId}/status`, null, { params: { status, reference_number: refNum } })

// Health
export const getHealth = () => api.get('/health')

export default api
