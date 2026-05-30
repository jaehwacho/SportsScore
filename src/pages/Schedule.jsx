import { useState } from 'react'
import './Schedule.css'

export default function Schedule({ data }) {
  const { matches } = data
  const [expandedMatch, setExpandedMatch] = useState(null)

  const getRoundBadgeColor = (round) => {
    const colors = {
      '예선': '#e0e0e0',
      '6강': '#fff9c4',
      '4강': '#ffe0b2',
      '결승': '#ffccbc'
    }
    return colors[round] || '#f5f5f5'
  }

  return (
    <div className="schedule">
      <h1>일정·결과</h1>
      <p className="subtitle">총 {matches.length}경기</p>

      <div className="matches-list">
        {matches.map((match) => (
          <div key={match.match_id} className="match-card">
            <div className="match-header" onClick={() => setExpandedMatch(expandedMatch === match.match_id ? null : match.match_id)}>
              <div className="match-date">
                <span className="date">{new Date(match.date).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}</span>
                <span className="round" style={{ backgroundColor: getRoundBadgeColor(match.round) }}>
                  {match.round}
                </span>
              </div>

              <div className="match-result">
                <div className="team team-left">
                  <p className="team-name">{match.team_a}</p>
                  <p className="set-score">{match.score_a}</p>
                </div>
                <div className="match-score">vs</div>
                <div className="team team-right">
                  <p className="set-score">{match.score_b}</p>
                  <p className="team-name">{match.team_b}</p>
                </div>
              </div>

              <div className="expand-icon">
                {expandedMatch === match.match_id ? '▲' : '▼'}
              </div>
            </div>

            {expandedMatch === match.match_id && match.sets && (
              <div className="match-details">
                <h4>세트별 스코어</h4>
                <table className="set-table">
                  <tbody>
                    {match.sets.map((set, idx) => (
                      <tr key={idx}>
                        <td className="set-num">세트 {idx + 1}</td>
                        <td className={match.score_a > match.score_b && set[0] > set[1] ? 'winner' : ''}>
                          {match.team_a} {set[0]}
                        </td>
                        <td className={match.score_b > match.score_a && set[1] > set[0] ? 'winner' : ''}>
                          {match.team_b} {set[1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
