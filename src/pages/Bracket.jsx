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

const ROUND_CONFIG = {
  '6강': { head: '6강 · QUARTER', short: 'Quarter' },
  '4강': { head: '4강 · SEMIFINAL', short: 'Semi' },
  '결승': { head: '결승 · FINAL', short: 'Final' },
}
const ROUND_ORDER = ['6강', '4강', '결승']

export default function Bracket({ data }) {
  const navigate = useNavigate()
  const { matches, tournament } = data

  // 통합 대회인 경우 비활성화
  if (tournament.id === 'integrated_2026') {
    return (
      <div className="page fade-up">
        <div className="page-head">
          <div className="eyebrow">Tournament Bracket</div>
          <h1 className="page-title">대진표</h1>
          <p className="page-sub">통합 대회 미지원</p>
        </div>
        <div className="card" style={{ padding: '40px', textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontSize: '16px', color: 'var(--text-mute)', lineHeight: '1.6' }}>
            통합 데이터에서는 대진표를 지원하지 않습니다.<br />
            개별 대회를 선택하여 대진표를 확인해주세요.
          </p>
        </div>
      </div>
    )
  }

  // 데이터에 실제로 있는 라운드만 추출
  const availableRounds = ROUND_ORDER.filter(round =>
    matches.some(m => m.round === round)
  )

  // 동적으로 컬럼 생성
  const cols = availableRounds.map(round => ({
    round,
    head: ROUND_CONFIG[round].head,
    list: matches.filter(m => m.round === round),
  }))

  return (
    <div className="page fade-up">
      <div className="page-head">
        <div className="eyebrow">Tournament Bracket</div>
        <h1 className="page-title">대진표</h1>
        <p className="page-sub">{availableRounds.join(' → ')} · 본선 토너먼트</p>
      </div>

      <div className="bracket-wrap scroll-area">
        <div className="bracket">
          {cols.map((c) => (
            <div className="round-col" key={c.round}>
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

      {tournament.round_note && (
        <div className="notice" style={{ marginTop: 28 }}>
          <span className="ic"><Icon name="info" /></span>
          <span>{tournament.round_note}</span>
        </div>
      )}
    </div>
  )
}
