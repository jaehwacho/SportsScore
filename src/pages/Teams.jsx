import { useState, useMemo } from 'react'
import './Teams.css'

export default function Teams({ data }) {
  const { standings } = data
  const [sort, setSort] = useState({ key: 'rank', dir: 1 })

  const rows = useMemo(() => {
    // result 기반 표시 순위 (공동 순위 처리)
    const resultRank = {
      '우승': 1,
      '준우승': 2,
      '4강': 3,   // 공동 3위
      '6강': 5,   // 공동 5위
      '예선': 7   // 예선 이하
    }

    const r = [...standings].map(team => ({
      ...team,
      displayRank: team.result === '통합' ? team.rank : (resultRank[team.result] || 7)
    }))

    r.sort((a, b) => {
      const sortKey = sort.key === 'rank' ? 'displayRank' : sort.key
      const av = a[sortKey], bv = b[sortKey]
      return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir
    })
    return r
  }, [standings, sort])

  const click = (key, defDir = 1) => setSort(s => s.key === key ? { key, dir: -s.dir } : { key, dir: defDir })
  const arr = (key) => sort.key === key ? <span className="arr">{sort.dir === 1 ? '▲' : '▼'}</span> : null

  const cols = [
    { key: 'matches', label: '경기' },
    { key: 'win', label: '승', dir: -1 },
    { key: 'loss', label: '패', dir: -1 },
    { key: 'set_win', label: '세트', dir: -1 },
    { key: 'points_for', label: '득점', dir: -1 },
    { key: 'points_against', label: '실점', dir: -1 },
  ]

  const medal = (rank) => rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : ''

  return (
    <div className="page fade-up">
      <div className="page-head">
        <div className="eyebrow">Standings</div>
        <h1 className="page-title">팀 순위</h1>
        <p className="page-sub">{standings.length}개 팀 종합 기록 · 헤더를 눌러 정렬</p>
      </div>

      <div className="card table-card">
        <table className="standings">
          <thead>
            <tr>
              <th onClick={() => click('rank')}># {arr('rank')}</th>
              <th className="lname">팀</th>
              {cols.map(c => <th key={c.key} onClick={() => click(c.key, c.dir)}>{c.label} {arr(c.key)}</th>)}
              <th>득실</th>
              <th>성적</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(s => {
              const diff = s.points_for - s.points_against
              return (
                <tr key={s.team}>
                  <td>
                    <div className={'st-rank' + (s.displayRank <= 3 ? ' top' : '')}>
                      <span className="r">{s.displayRank}</span>{medal(s.displayRank) && <span>{medal(s.displayRank)}</span>}
                    </div>
                  </td>
                  <td className="st-team"><span className="tn">{s.team}</span></td>
                  <td>{s.matches}</td>
                  <td><span className="wl"><b className="w">{s.win}</b></span></td>
                  <td><span className="wl"><b className="l">{s.loss}</b></span></td>
                  <td className="tnum">{s.set_win}–{s.set_loss}</td>
                  <td className="tnum">{s.points_for}</td>
                  <td className="tnum">{s.points_against}</td>
                  <td className={'tnum diff ' + (diff >= 0 ? 'pos' : 'neg')}>{diff >= 0 ? '+' : ''}{diff}</td>
                  <td><span className={'st-result res-' + s.result}>{s.result}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="team-cards">
        {rows.map(s => (
          <div className="card team-card" key={s.team}>
            <div className={'tc-top' + (s.displayRank <= 3 ? ' top' : '')}>
              <span className="tc-rank">{s.displayRank}</span>
              <span className="tc-name">{s.team}{medal(s.displayRank) && ' ' + medal(s.displayRank)}</span>
              <span className={'st-result res-' + s.result}>{s.result}</span>
            </div>
            <div className="tc-stats">
              <div className="c"><div className="v win">{s.win}<span className="su">승</span></div><div className="k">{s.loss}패</div></div>
              <div className="c"><div className="v">{s.set_win}–{s.set_loss}</div><div className="k">세트</div></div>
              <div className="c"><div className="v">{s.points_for}</div><div className="k">득점</div></div>
              <div className="c"><div className="v">{s.points_against}</div><div className="k">실점</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
