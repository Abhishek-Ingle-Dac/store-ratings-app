import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' })
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.name.length < 3) return setError('Name too short')
    if (form.password.length < 8) return setError('Password must be at least 8 chars')
    try {
      await signup(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="card">
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <label>Name
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>Email
          <input name="email" type="email" value={form.email} onChange={onChange} required />
        </label>
        <label>Address
          <textarea name="address" value={form.address} onChange={onChange} />
        </label>
        <label>Password
          <input name="password" type="password" value={form.password} onChange={onChange} required />
        </label>
        <button type="submit">Create account</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
