import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
  withCredentials:true
})
export const api = {
  createRating: (data) => API.post('/ratings', data),
  // other endpoints...
};
let authToken = null

export function setToken(token) {
  authToken = token
}

API.interceptors.request.use(config => {
  if (authToken) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

API.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default {
  setToken,
  login: (data) => API.post('/auth/login', data),
  signup: (data) => API.post('/auth/signup', data),
  changePassword: (data) => API.post('/auth/change-password', data),
  listStores: (params) => API.get('/stores', { params }),
  getStore: (id) => API.get(`/stores/${id}`),
  createStore: (data) => API.post('/stores', data),
  updateStore: (id, data) => API.put(`/stores/${id}`, data),
  deleteStore: (id) => API.delete(`/stores/${id}`),
  createRating: (data) => API.post('/ratings', data),
  updateRating: (id, data) => API.put(`/ratings/${id}`, data),
  deleteRating: (id) => API.delete(`/ratings/${id}`),
  listRatings: (params) => API.get('/ratings', { params }),
  adminUsers: () => API.get('/admin/users'),
  adminStores: () => API.get('/admin/stores'),
}
