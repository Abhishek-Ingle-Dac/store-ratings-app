import React, { createContext, useState, useEffect } from 'react'
import api, { setToken } from '../api/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUser(null)
  }, [])

  const login = async (credentials) => {
    setLoading(true)
    try {
      const res = await api.login(credentials)
      const { token, user } = res.data
      if (token) setToken(token)
      setUser(user)
      return { user }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (data) => {
    setLoading(true)
    try {
      const res = await api.signup(data)
      if (res.data.token) {
        setToken(res.data.token)
        setUser(res.data.user)
      }
      return res.data
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setToken(null)
    setUser(null)
  }

  const changePassword = (payload) => api.changePassword(payload)

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}
