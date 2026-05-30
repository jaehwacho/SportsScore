import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useSearchParams } from 'react-router-dom'
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

function AppContent() {
  const [tournamentIndex, setTournamentIndex] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTournamentId = searchParams.get('t')

  // 대회 인덱스 로드 (1회)
  useEffect(() => {
    fetch('/data/tournaments.json')
      .then(r => { if (!r.ok) throw new Error('대회 목록을 불러올 수 없습니다.'); return r.json() })
      .then(idx => {
        setTournamentIndex(idx)
        // URL에 ?t 파라미터가 없으면 기본값 사용
        if (!activeTournamentId) {
          setSearchParams({ t: idx.default_tournament })
        }
      })
      .catch(e => setError(e.message))
  }, [])

  // 선택된 대회 데이터 로드
  useEffect(() => {
    if (!tournamentIndex || !activeTournamentId) return

    const tournament = tournamentIndex.tournaments.find(t => t.id === activeTournamentId)
    if (!tournament) {
      setError(`대회를 찾을 수 없습니다: ${activeTournamentId}`)
      return
    }

    setData(null)
    fetch(`/data/${tournament.file}`)
      .then(r => { if (!r.ok) throw new Error('데이터를 불러올 수 없습니다.'); return r.json() })
      .then(setData)
      .catch(e => setError(e.message))
  }, [activeTournamentId, tournamentIndex])

  const handleTournamentChange = (newId) => {
    setSearchParams({ t: newId })
  }

  if (error) return <div className="error">오류: {error}</div>
  if (!tournamentIndex || !data) return <div className="loading">데이터 로딩 중…</div>

  return (
    <>
      <ScrollToTop />
      <div className="app">
        <Navigation
          tournamentIndex={tournamentIndex}
          activeTournamentId={activeTournamentId}
          onTournamentChange={handleTournamentChange}
        />
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
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
