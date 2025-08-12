import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'

export default function StorePage() {
  const { id } = useParams()
  const [store, setStore] = useState(null)
  const [error, setError] = useState('')
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(() => {
    api.getStore(id).then(res => setStore(res.data)).catch(err => setError('Could not load store'))
  }, [id])

  const submitRating = async (e) => {
    e.preventDefault()
    try {
      await api.createRating({ storeId: id, score, comment })
      const res = await api.getStore(id)
      setStore(res.data)
      setComment('')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit rating')
    }
  }

  if (!store) return <div>Loading...</div>

  return (
    <div>
      <h2>{store.name}</h2>
      <p>{store.address}</p>
      <h3>Ratings</h3>
      {store.ratings && store.ratings.length === 0 && <div>No ratings yet</div>}
      <ul>
        {store.ratings && store.ratings.map(r => (
          <li key={r.id || r._id}>
            <strong>{r.userName || r.user?.name || 'User'}</strong> — {r.score} / 5
            <div>{r.comment}</div>
          </li>
        ))}
      </ul>
      <div className="card">
        <h4>Leave a rating</h4>
        <form onSubmit={submitRating}>
          <label>Score
            <select value={score} onChange={e => setScore(+e.target.value)}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label>Comment
            <textarea value={comment} onChange={e => setComment(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  )
}
