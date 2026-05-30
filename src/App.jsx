import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Bracket from './pages/Bracket'
import Teams from './pages/Teams'
import Players from './pages/Players'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/danyang_2026_data.json')
        if (!response.ok) throw new Error('Failed to load data')
        const jsonData = await response.json()
        setData(jsonData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <div className="loading">데이터 로딩 중...</div>
  if (error) return <div className="error">오류: {error}</div>
  if (!data) return <div className="error">데이터를 불러올 수 없습니다.</div>

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/schedule" element={<Schedule data={data} />} />
            <Route path="/bracket" element={<Bracket data={data} />} />
            <Route path="/teams" element={<Teams data={data} />} />
            <Route path="/players" element={<Players data={data} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
