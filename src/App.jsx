import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navigation, { TabBar } from './components/Navigation'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Bracket from './pages/Bracket'
import Teams from './pages/Teams'
import Players from './pages/Players'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname])
  return null
}

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/data/danyang_2026_data.json')
      .then(r => { if (!r.ok) throw new Error('데이터를 불러올 수 없습니다.'); return r.json() })
      .then(setData)
      .catch(e => setError(e.message))
  }, [])

  if (error) return <div className="error">오류: {error}</div>
  if (!data) return <div className="loading">데이터 로딩 중…</div>

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navigation tournament={data.tournament} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/schedule" element={<Schedule data={data} />} />
            <Route path="/bracket" element={<Bracket data={data} />} />
            <Route path="/teams" element={<Teams data={data} />} />
            <Route path="/players" element={<Players data={data} />} />
          </Routes>
        </main>
        <TabBar />
      </div>
    </Router>
  )
}

export default App
