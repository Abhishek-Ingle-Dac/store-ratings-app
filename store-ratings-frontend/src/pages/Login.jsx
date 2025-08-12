import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api, { setToken } from '../api/api'
import { useAuth } from '../auth/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.login({ email, password })
      const { token, user } = res.data
      if (token) setToken(token)
      await login({ email, password })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Email
          <input value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
        <div className="muted">Don't have an account? <Link to="/signup">Signup</Link></div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
