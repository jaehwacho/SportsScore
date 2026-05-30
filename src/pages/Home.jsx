import { Link } from 'react-router-dom'
import './Home.css'

export default function Home({ data }) {
  const { tournament, standings } = data
  const champion = standings[0]
  const runnerUp = standings[1]

  return (
    <div className="home">
      <section className="hero">
        <h1>{tournament.name}</h1>
        <p className="subtitle">{tournament.division}</p>
        <p className="date">
          {new Date(tournament.date_start).toLocaleDateString('ko-KR')} ~ {new Date(tournament.date_end).toLocaleDateString('ko-KR')}
        </p>
      </section>

      <section className="results-summary">
        <div className="champion">
          <div className="medal">🥇</div>
          <h2>우승</h2>
          <p className="team-name">{champion.team}</p>
          <p className="record">{champion.win}승 {champion.loss}패</p>
        </div>

        <div className="runner-up">
          <div className="medal">🥈</div>
          <h2>준우승</h2>
          <p className="team-name">{runnerUp.team}</p>
          <p className="record">{runnerUp.win}승 {runnerUp.loss}패</p>
        </div>
      </section>

      <section className="quick-menu">
        <h2>바로가기</h2>
        <div className="menu-grid">
          <Link to="/schedule" className="menu-card">
            <div className="menu-icon">📅</div>
            <h3>일정·결과</h3>
            <p>14경기 보기</p>
          </Link>
          <Link to="/bracket" className="menu-card">
            <div className="menu-icon">🏆</div>
            <h3>대진표</h3>
            <p>토너먼트 브래킷</p>
          </Link>
          <Link to="/teams" className="menu-card">
            <div className="menu-icon">📊</div>
            <h3>팀 순위</h3>
            <p>{tournament.team_count}개 팀</p>
          </Link>
          <Link to="/players" className="menu-card">
            <div className="menu-icon">👥</div>
            <h3>선수 기록</h3>
            <p>{data.players.length}명의 선수</p>
          </Link>
        </div>
      </section>

      <section className="info">
        <p className="data-notice">{tournament.data_notice}</p>
      </section>
    </div>
  )
}
