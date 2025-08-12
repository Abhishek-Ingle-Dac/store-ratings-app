import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { Link } from 'react-router-dom'

export default function StoreList() {
  const [stores, setStores] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.listStores().then(res => setStores(res.data)).catch(err => setError('Could not load stores'))
  }, [])

  return (
    <div>
      <h2>Stores</h2>
      {error && <div className="error">{error}</div>}
      <div className="grid">
        {stores.length === 0 && <div>No stores yet.</div>}
        {stores.map(s => (
          <div className="card" key={s.id || s._id}>
            <h3>{s.name}</h3>
            <p className="muted">{s.address}</p>
            <div className="row">
              <Link to={`/stores/${s.id || s._id}`}>View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
