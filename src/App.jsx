import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://catfact.ninja/fact'

function App() {
  const [fact, setFact] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('catfacts-favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [view, setView] = useState('fact')

  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem('catfacts-favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const fetchFact = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Failed to fetch a cat fact')
      const data = await res.json()
      setFact(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFact()
  }, [])

  const addFavorite = () => {
    if (!fact) return
    if (favorites.some(f => f.fact === fact.fact)) return
    setFavorites(prev => [fact, ...prev])
  }

  const removeFavorite = (factText) => {
    setFavorites(prev => prev.filter(f => f.fact !== factText))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Cat Facts 🐱</h1>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${view === 'fact' ? 'active' : ''}`}
          onClick={() => setView('fact')}
        >
          Cat Fact
        </button>
        <button
          className={`tab ${view === 'favorites' ? 'active' : ''}`}
          onClick={() => setView('favorites')}
        >
          Favorites
          {favorites.length > 0 && (
            <span className="badge">{favorites.length}</span>
          )}
        </button>
      </nav>

      <main className="main">
        {view === 'fact' ? (
          <section className="fact-section">
            {loading && <p className="loading">Loading a random cat fact…</p>}
            {error && <p className="error">{error}</p>}

            {fact && !loading && (
              <article className="fact-card">
                <p className="fact-text">{fact.fact}</p>
                <p className="fact-length">{fact.length} characters</p>
              </article>
            )}

            <div className="actions">
              <button className="btn btn-primary" onClick={fetchFact} disabled={loading}>
                {loading ? 'Loading…' : 'Refresh'}
              </button>
              <button
                className="btn btn-favorite"
                onClick={addFavorite}
                disabled={!fact || loading}
              >
                ♥
                Favorite
              </button>
            </div>
          </section>
        ) : (
          <section className="favorites-section">
            {favorites.length === 0 ? (
              <p className="empty">No favorites yet. Find a fact you like and tap ♥ Favorite.</p>
            ) : (
              <ul className="favorites-list">
                {favorites.map((f, i) => (
                  <li key={i} className="favorite-item">
                    <p className="favorite-text">{f.fact}</p>
                    <button
                      className="btn btn-remove"
                      onClick={() => removeFavorite(f.fact)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Powered by <a href="https://catfact.ninja" rel="noopener noreferrer" target="_blank">catfact.ninja</a></p>
      </footer>
    </div>
  )
}

export default App
