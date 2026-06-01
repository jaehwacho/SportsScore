import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { fmtLong } from '../lib/format'
import './Home.css'

export default function Home({ data }) {
  const navigate = useNavigate()
  const { tournament, standings, matches, players } = data
  const champ = standings[0]
  const runner = standings[1]
  const final = matches.find(m => m.round === '결승')
  const totalSets = matches.reduce((a, m) => a + m.sets.length, 0)
  const playedCount = players.filter(p => p.played).length

  const menu = [
    { to: '/schedule', icon: 'cal', t: '일정·결과', d: `${tournament.match_count}경기 전체 보기` },
    { to: '/bracket', icon: 'trophy', t: '대진표', d: '6강 → 4강 → 결승' },
    { to: '/teams', icon: 'chart', t: '팀 순위', d: `${tournament.team_count}개 팀 종합 기록` },
    { to: '/players', icon: 'people', t: '선수 기록', d: `출전 선수 ${playedCount}명` },
  ]

  return (
    <div className="page fade-up">
      <section className="hero">
        <div className="hero-tag eyebrow">{fmtLong(tournament.date_start)} – {fmtLong(tournament.date_end)}</div>
        <h1>{tournament.name}</h1>
        <div className="division">{tournament.division}</div>
        <div className="hero-meta">
          <div className="m"><div className="k">참가 팀</div><div className="v">{tournament.team_count}개 팀</div></div>
          <div className="m"><div className="k">총 경기</div><div className="v">{tournament.match_count}경기</div></div>
          <div className="m"><div className="k">출전 선수</div><div className="v">{playedCount}명</div></div>
          <div className="m"><div className="k">우승</div><div className="v">{tournament.champion}</div></div>
        </div>
      </section>

      <section className="podium">
        <div className="podium-card champ" onClick={() => navigate('/teams')}>
          <div className="podium-rank"><span className="podium-medal">🥇</span>CHAMPION · 우승</div>
          <div className="team">{champ.team}</div>
          <div className="rec">
            <span className="big">{champ.win}<span className="su">승</span> {champ.loss}<span className="su">패</span></span>
            <span className="lbl">세트 {champ.set_win}–{champ.set_loss}</span>
          </div>
          <span className="trophy">🏆</span>
        </div>
        <div className="podium-card runner" onClick={() => navigate('/teams')}>
          <div className="podium-rank"><span className="podium-medal">🥈</span>RUNNER-UP · 준우승</div>
          <div className="team">{runner.team}</div>
          <div className="rec">
            <span className="big">{runner.win}<span className="su">승</span> {runner.loss}<span className="su">패</span></span>
            <span className="lbl">세트 {runner.set_win}–{runner.set_loss}</span>
          </div>
        </div>
      </section>

      {final && (
        <section className="card final-strip" onClick={() => navigate('/bracket')}>
          <span className="badge round-결승">결승</span>
          <div className="fs-body">
            <span className={'fs-team' + (final.winner === final.team_a ? ' win' : '')}>{final.team_a}</span>
            <span className="fs-score">
              <span className={final.score_a > final.score_b ? 'on' : 'off'}>{final.score_a}</span>
              <span className="sep">:</span>
              <span className={final.score_b > final.score_a ? 'on' : 'off'}>{final.score_b}</span>
            </span>
            <span className={'fs-team' + (final.winner === final.team_b ? ' win' : '')}>{final.team_b}</span>
          </div>
          <span className="fs-arrow"><Icon name="arrow" /></span>
        </section>
      )}

      <section className="statstrip">
        <div className="stat"><div className="v">{tournament.match_count}</div><div className="k">총 경기 수</div></div>
        <div className="stat"><div className="v">{totalSets}</div><div className="k">치러진 세트</div></div>
        <div className="stat"><div className="v">{standings.reduce((a, s) => a + s.points_for, 0)}</div><div className="k">총 득점</div></div>
        <div className="stat"><div className="v">{playedCount}</div><div className="k">출전 선수</div></div>
      </section>

      <div className="section-label">바로가기</div>
      <section className="menu-grid">
        {menu.map(m => (
          <button key={m.to} className="menu-card" onClick={() => navigate(m.to)}>
            <div className="ic"><Icon name={m.icon} size={20} /></div>
            <h3>{m.t}</h3>
            <p>{m.d}</p>
            <span className="arrow"><Icon name="arrow" /></span>
          </button>
        ))}
      </section>

      <div className="notice">
        <span className="ic"><Icon name="info" /></span>
        <span>{tournament.data_notice}</span>
      </div>
    </div>
  )
}
