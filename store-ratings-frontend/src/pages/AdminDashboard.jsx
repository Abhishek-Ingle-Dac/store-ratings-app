import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.adminUsers().then(res => setUsers(res.data)).catch(() => {})
  }, [])

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="card">
        <h3>Users</h3>
        <ul>
          {users.map(u => <li key={u.id || u._id}>{u.name} — {u.email} — {u.role}</li>)}
        </ul>
      </div>
    </div>
  )
}
