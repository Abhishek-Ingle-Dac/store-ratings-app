import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import api, { setToken } from '../api/api'

export default function Header() {
  const { user, logout } = useAuth()

  const doLogout = () => {
    setToken(null)
    logout()
  }

  return (
    <header className="header">
      <div className="container row">
        <Link to="/"><h1>StoreRatings</h1></Link>
        <nav>
          {user ? (
            <>
              <span className="muted">Hi, {user.name}</span>
              <Link to="/change-password">Change pwd</Link>
              {user.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
              {user.role === 'OWNER' && <Link to="/owner">Owner</Link>}
              <button className="btn-ghost" onClick={doLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
