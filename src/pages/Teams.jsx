import { useState } from 'react'
import './Teams.css'

export default function Teams({ data }) {
  const { standings } = data
  const [sortBy, setSortBy] = useState('rank')

  const getSortedTeams = () => {
    const sorted = [...standings]
    switch (sortBy) {
      case 'rank':
        return sorted.sort((a, b) => a.rank - b.rank)
      case 'win':
        return sorted.sort((a, b) => b.win - a.win)
      case 'pf':
        return sorted.sort((a, b) => b.points_for - a.points_for)
      case 'pa':
        return sorted.sort((a, b) => a.points_against - b.points_against)
      default:
        return sorted
    }
  }

  const getResultBgColor = (result) => {
    const colors = {
      '우승': '#fff3e0',
      '준우승': '#e8f5e9',
      '4강': '#f3e5f5',
      '6강': '#e3f2fd',
      '예선': '#fafafa'
    }
    return colors[result] || '#fff'
  }

  const getResultBorderColor = (result) => {
    const colors = {
      '우승': '#ff9800',
      '준우승': '#4caf50',
      '4강': '#9c27b0',
      '6강': '#2196f3',
      '예선': '#e0e0e0'
    }
    return colors[result] || '#e0e0e0'
  }

  return (
    <div className="teams">
      <h1>팀 순위</h1>
      <p className="subtitle">종합 순위표</p>

      <div className="sort-controls">
        <label>정렬:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="rank">순위</option>
          <option value="win">승수</option>
          <option value="pf">득점</option>
          <option value="pa">실점</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="standings-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>팀명</th>
              <th>경기</th>
              <th>승</th>
              <th>패</th>
              <th>세트</th>
              <th>득점</th>
              <th>실점</th>
              <th>성적</th>
            </tr>
          </thead>
          <tbody>
            {getSortedTeams().map((team) => (
              <tr key={team.rank} style={{ backgroundColor: getResultBgColor(team.result) }}>
                <td className="rank">
                  {team.result === '우승' && '🥇'}
                  {team.result === '준우승' && '🥈'}
                  {team.rank}
                </td>
                <td className="team-name">{team.team}</td>
                <td>{team.matches}</td>
                <td className="win">{team.win}</td>
                <td>{team.loss}</td>
                <td className="sets">{team.set_win}-{team.set_loss}</td>
                <td>{team.points_for}</td>
                <td>{team.points_against}</td>
                <td className="result" style={{ borderLeft: `3px solid ${getResultBorderColor(team.result)}` }}>
                  {team.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h4>최고 득점팀</h4>
          <p className="stat-value">{standings.reduce((max, t) => t.points_for > max.points_for ? t : max).team}</p>
          <p className="stat-detail">{standings.reduce((max, t) => t.points_for > max.points_for ? t : max).points_for}점</p>
        </div>
        <div className="stat-card">
          <h4>최저 실점팀</h4>
          <p className="stat-value">{standings.reduce((min, t) => t.points_against < min.points_against ? t : min).team}</p>
          <p className="stat-detail">{standings.reduce((min, t) => t.points_against < min.points_against ? t : min).points_against}점</p>
        </div>
        <div className="stat-card">
          <h4>최고 득점률</h4>
          <p className="stat-value">{Math.max(...standings.map(t => t.pf_per_set)).toFixed(1)}</p>
          <p className="stat-detail">세트당 득점</p>
        </div>
      </div>
    </div>
  )
}
