import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import StoreList from './pages/StoreList'
import StorePage from './pages/StorePage'
import ChangePassword from './pages/ChangePassword'
import AdminDashboard from './pages/AdminDashboard'
import OwnerDashboard from './pages/OwnerDashboard'
import Header from './components/Header'
import { useAuth } from './auth/useAuth'

function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="center">Loading...</div>
  return user ? children : <Navigate to="/login" replace />
}

function RoleRoute({ role, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return user.role === role ? children : <div className="center">Unauthorized</div>
}

export default function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <RequireAuth><StoreList /></RequireAuth>
          } />
          <Route path="/stores/:id" element={
            <RequireAuth><StorePage /></RequireAuth>
          } />
          <Route path="/change-password" element={
            <RequireAuth><ChangePassword /></RequireAuth>
          } />
          <Route path="/admin" element={
            <RequireAuth><RoleRoute role="ADMIN"><AdminDashboard /></RoleRoute></RequireAuth>
          } />
          <Route path="/owner" element={
            <RequireAuth><RoleRoute role="OWNER"><OwnerDashboard /></RoleRoute></RequireAuth>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
