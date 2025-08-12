import React, { useState } from 'react'
import { useAuth } from '../auth/useAuth'

export default function ChangePassword() {
  const [oldPassword, setOld] = useState('')
  const [newPassword, setNew] = useState('')
  const [msg, setMsg] = useState('')
  const { changePassword } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await changePassword({ oldPassword, newPassword })
      setMsg('Password changed')
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="card">
      <h2>Change Password</h2>
      <form onSubmit={submit}>
        <label>Old password
          <input type="password" value={oldPassword} onChange={e => setOld(e.target.value)} required />
        </label>
        <label>New password
          <input type="password" value={newPassword} onChange={e => setNew(e.target.value)} required />
        </label>
        <button type="submit">Change</button>
        {msg && <div className="muted">{msg}</div>}
      </form>
    </div>
  )
}
