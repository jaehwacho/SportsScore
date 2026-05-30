import './Bracket.css'

export default function Bracket({ data }) {
  const { matches } = data
  const matchesById = {}
  matches.forEach(m => matchesById[m.id] = m)

  // 라운드별 매치 그룹화
  const semifinal = matches.filter(m => m.round === '6강')
  const quarterfinal = matches.filter(m => m.round === '4강')
  const final = matches.filter(m => m.round === '결승')

  const getWinner = (match) => {
    if (match.score_a > match.score_b) return match.team_a
    if (match.score_b > match.score_a) return match.team_b
    return null
  }

  return (
    <div className="bracket">
      <h1>대진표</h1>
      <p className="subtitle">토너먼트 브래킷</p>

      <div className="bracket-container">
        {/* 6강 */}
        <div className="bracket-round">
          <h3 className="round-title">6강</h3>
          <div className="matches">
            {semifinal.map(match => (
              <div key={match.match_id} className="bracket-match">
                <div className="bracket-team">
                  <span className="team-name">{match.team_a}</span>
                  <span className="score">{match.score_a}</span>
                </div>
                <div className="vs">vs</div>
                <div className="bracket-team">
                  <span className="score">{match.score_b}</span>
                  <span className="team-name">{match.team_b}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4강 */}
        <div className="bracket-round">
          <h3 className="round-title">4강</h3>
          <div className="matches">
            {quarterfinal.map(match => (
              <div key={match.id} className="bracket-match">
                <div className="bracket-team">
                  <span className="team-name">{match.team_a}</span>
                  <span className="score">{match.sets_a}</span>
                </div>
                <div className="vs">vs</div>
                <div className="bracket-team">
                  <span className="score">{match.sets_b}</span>
                  <span className="team-name">{match.team_b}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 결승 */}
        <div className="bracket-round final-round">
          <h3 className="round-title">결승</h3>
          <div className="matches">
            {final.map(match => {
              const winner = getWinner(match)
              return (
                <div key={match.id} className="bracket-match final-match">
                  <div className={`bracket-team ${winner === match.team_a ? 'champion' : ''}`}>
                    <span className="team-name">{match.team_a}</span>
                    <span className="score">{match.sets_a}</span>
                  </div>
                  <div className="vs">vs</div>
                  <div className={`bracket-team ${winner === match.team_b ? 'champion' : ''}`}>
                    <span className="score">{match.sets_b}</span>
                    <span className="team-name">{match.team_b}</span>
                  </div>
                </div>
              )
            })}
          </div>
          {final.length > 0 && (
            <div className="champion-badge">
              🥇 우승: {getWinner(final[0])}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
