import { useState, useMemo } from 'react'
import './Players.css'

export default function Players({ data }) {
  const { players } = data
  const [search, setSearch] = useState('')
  const [filterTeam, setFilterTeam] = useState('')
  const [filterPos, setFilterPos] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const teams = [...new Set(players.map(p => p.team))].sort()
  const positions = [...new Set(players.filter(p => p.pos1).map(p => p.pos1))].sort()

  const filteredPlayers = useMemo(() => {
    return players.filter(p => {
      const matchSearch = p.name.includes(search) || p.team.includes(search)
      const matchTeam = !filterTeam || p.team === filterTeam
      const matchPos = !filterPos || p.pos1 === filterPos || p.pos2 === filterPos
      return matchSearch && matchTeam && matchPos
    })
  }, [search, filterTeam, filterPos, players])

  const sortedPlayers = useMemo(() => {
    const sorted = [...filteredPlayers]
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ko'))
      case 'points':
        return sorted.sort((a, b) => (b.total_points || 0) - (a.total_points || 0))
      case 'kills':
        return sorted.sort((a, b) => (b.kills || 0) - (a.kills || 0))
      case 'blocks':
        return sorted.sort((a, b) => (b.blocks || 0) - (a.blocks || 0))
      case 'aces':
        return sorted.sort((a, b) => (b.serve_aces || 0) - (a.serve_aces || 0))
      case 'digs':
        return sorted.sort((a, b) => (b.digs || 0) - (a.digs || 0))
      default:
        return sorted
    }
  }, [filteredPlayers, sortBy])

  return (
    <div className="players">
      <h1>선수 기록</h1>
      <p className="subtitle">총 {data.players.length}명의 선수 중 {sortedPlayers.length}명</p>

      <div className="filters">
        <div className="filter-group">
          <label>선수 검색</label>
          <input
            type="text"
            placeholder="선수명 입력..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>팀</label>
          <select value={filterTeam} onChange={(e) => setFilterTeam(e.target.value)}>
            <option value="">전체</option>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>포지션</label>
          <select value={filterPos} onChange={(e) => setFilterPos(e.target.value)}>
            <option value="">전체</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>정렬</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">이름순</option>
            <option value="points">총점수</option>
            <option value="kills">공격성공</option>
            <option value="blocks">블로킹</option>
            <option value="aces">서브에이스</option>
            <option value="digs">디그</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="players-table">
          <thead>
            <tr>
              <th>팀</th>
              <th>등번</th>
              <th>이름</th>
              <th>학년</th>
              <th>포지션</th>
              <th>경기</th>
              <th>총점</th>
              <th>공격</th>
              <th>블로킹</th>
              <th>서브에이스</th>
              <th>디그</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player) => (
              <tr key={`${player.team}-${player.jersey}`}>
                <td className="team">{player.team}</td>
                <td className="jersey">{player.jersey}</td>
                <td className="name">{player.name}</td>
                <td>{player.grade || '-'}</td>
                <td className="position">
                  {player.pos1}{player.pos2 ? `/${player.pos2}` : ''}
                </td>
                <td>{player.matches || 0}</td>
                <td className="points">{player.total_points || 0}</td>
                <td>{player.kills || 0}</td>
                <td>{player.blocks || 0}</td>
                <td>{player.serve_aces || 0}</td>
                <td>{player.digs || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedPlayers.length === 0 && (
        <div className="no-results">검색 결과가 없습니다.</div>
      )}
    </div>
  )
}
