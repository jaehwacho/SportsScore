import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import './Bracket.css'

function BracketBox({ m, onClick }) {
  if (!m) return null
  const aWin = m.winner === m.team_a
  const bWin = m.winner === m.team_b
  return (
    <div className={'bx' + (m.round === '결승' ? ' champion-box' : '')} onClick={onClick}>
      <div className={'bx-team' + (aWin ? ' winner' : '')}>
        <span>{m.team_a}</span><span className="s">{m.score_a}</span>
      </div>
      <div className={'bx-team' + (bWin ? ' winner' : '')}>
        <span>{m.team_b}</span><span className="s">{m.score_b}</span>
      </div>
    </div>
  )
}

export default function Bracket({ data }) {
  const navigate = useNavigate()
  const { matches, tournament } = data
  const cols = [
    { head: '6강 · QUARTER', list: matches.filter(m => m.round === '6강') },
    { head: '4강 · SEMIFINAL', list: matches.filter(m => m.round === '4강') },
    { head: '결승 · FINAL', list: matches.filter(m => m.round === '결승') },
  ]

  return (
    <div className="page fade-up">
      <div className="page-head">
        <div className="eyebrow">Tournament Bracket</div>
        <h1 className="page-title">대진표</h1>
        <p className="page-sub">6강부터 결승까지 · 본선 토너먼트</p>
      </div>

      <div className="bracket-wrap scroll-area">
        <div className="bracket">
          {cols.map((c, i) => (
            <div className="round-col" key={i}>
              <div className="rc-head">{c.head}</div>
              <div className="matches">
                {c.list.map(m => <BracketBox key={m.no} m={m} onClick={() => navigate('/schedule')} />)}
              </div>
            </div>
          ))}
          <div className="round-col">
            <div className="rc-head">우승 · CHAMPION</div>
            <div className="matches">
              <div className="champ-final">
                <div className="cup">🏆</div>
                <div className="lbl">Champion</div>
                <div className="nm">{tournament.champion}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="notice" style={{ marginTop: 28 }}>
        <span className="ic"><Icon name="info" /></span>
        <span>{tournament.round_note}</span>
      </div>
    </div>
  )
}
