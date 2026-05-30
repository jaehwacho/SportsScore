import { useState, useMemo } from 'react'
import Icon from '../components/Icon'
import { fmtDate } from '../lib/format'
import './Schedule.css'

function MatchCard({ m }) {
  const [open, setOpen] = useState(false)
  const aWin = m.winner === m.team_a
  const bWin = m.winner === m.team_b
  return (
    <div className={'card match' + (open ? ' open' : '')}>
      <button className="match-row" onClick={() => setOpen(o => !o)}>
        <div className="match-meta">
          <span className={'badge round-' + m.round}>{m.round}</span>
          <span className="match-no">{m.no}경기</span>
        </div>
        <div className="team-side">
          <span className={'name' + (aWin ? '' : ' lose')}>{m.team_a}</span>
          {aWin && <span className="win-pill">● WIN</span>}
        </div>
        <div className="score-pair">
          <span className={'score' + (aWin ? ' win' : '')}>{m.score_a}</span>
          <span className="score-vs">VS</span>
          <span className={'score' + (bWin ? ' win' : '')}>{m.score_b}</span>
        </div>
        <div className="team-side right">
          <span className={'name' + (bWin ? '' : ' lose')}>{m.team_b}</span>
          {bWin && <span className="win-pill">WIN ●</span>}
        </div>
        <span className="chev"><Icon name="chevDown" /></span>
      </button>
      {open && (
        <div className="sets-table">
          <div className="sets-grid">
            {m.sets.map((s, i) => {
              const wa = s[0] > s[1], wb = s[1] > s[0]
              return (
                <div key={i} className={'set-cell' + (wa ? ' win-a' : wb ? ' win-b' : '')}>
                  <div className="sl">SET {i + 1}</div>
                  <div className="sv"><span className="a">{s[0]}</span><span className="sep">–</span><span className="b">{s[1]}</span></div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Schedule({ data }) {
  const { matches } = data
  const days = useMemo(() => {
    const map = new Map()
    matches.forEach(m => { if (!map.has(m.date)) map.set(m.date, []); map.get(m.date).push(m) })
    return [...map.entries()]
  }, [matches])

  return (
    <div className="page fade-up">
      <div className="page-head">
        <div className="eyebrow">Schedule &amp; Results</div>
        <h1 className="page-title">일정 · 결과</h1>
        <p className="page-sub">3월 13일 – 19일 · 총 {matches.length}경기</p>
      </div>

      {days.map(([date, list]) => (
        <section className="day-group" key={date}>
          <div className="day-head">
            <span className="date">{fmtDate(date)}</span>
            <span className="dow">({list[0].day})</span>
            <span className="line"></span>
            <span className="cnt">{list.length}경기</span>
          </div>
          {list.map(m => <MatchCard key={m.no} m={m} />)}
        </section>
      ))}
    </div>
  )
}
