import { useState, useMemo } from 'react'
import Icon from '../components/Icon'
import { POS_KR } from '../lib/format'
import './Players.css'

function PlayerModal({ p, onClose }) {
  const pos = [p.pos1, p.pos2].filter(Boolean).map(x => POS_KR[x] || x).join(' / ')
  const stats = [
    { k: '득점', v: p.total_points, accent: true },
    { k: '공격성공', v: p.kills },
    { k: '블로킹', v: p.blocks },
    { k: '서브에이스', v: p.serve_aces },
    { k: '디그', v: p.digs },
    { k: '리시브성공', v: p.rcv_success },
  ]
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-hero">
          <button className="modal-close" onClick={onClose}><Icon name="close" /></button>
          <div className="modal-jersey">{p.team} · No.{p.jersey}</div>
          <div className="modal-name">{p.name}</div>
          <div className="modal-sub">
            <span className="chip">{pos || '—'}</span>
            <span className="chip"><b>{p.grade}</b>학년</span>
            {p.height ? <span className="chip"><b>{p.height}</b>cm</span> : null}
            {p.weight ? <span className="chip"><b>{p.weight}</b>kg</span> : null}
            <span className="chip"><b>{p.matches}</b>경기 · <b>{p.sets}</b>세트</span>
          </div>
        </div>
        <div className="modal-stats">
          <h4>누적 기록</h4>
          <div className="stat-grid">
            {stats.map(s => (
              <div className="sb" key={s.k}>
                <div className={'v' + (s.accent ? ' accent' : '')}>{s.v}</div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>
          {(p.hit_pct != null || p.rcv_rate != null) && (
            <>
              <h4 style={{ marginTop: 20 }}>효율</h4>
              <div className="stat-grid two">
                <div className="sb"><div className="v">{p.hit_pct != null ? (p.hit_pct * 100).toFixed(1) + '%' : '—'}</div><div className="k">공격 성공률</div></div>
                <div className="sb"><div className="v">{p.rcv_rate != null ? p.rcv_rate + '%' : '—'}</div><div className="k">리시브 효율</div></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Players({ data }) {
  const all = useMemo(() => data.players.filter(p => p.played), [data])
  const [q, setQ] = useState('')
  const [team, setTeam] = useState('')
  const [pos, setPos] = useState('')
  const [grade, setGrade] = useState('')
  const [sort, setSort] = useState({ key: 'total_points', dir: -1 })
  const [sel, setSel] = useState(null)

  const teams = useMemo(() => [...new Set(all.map(p => p.team))], [all])
  const positions = useMemo(() => [...new Set(all.map(p => p.pos1).filter(Boolean))], [all])
  const grades = useMemo(() => [...new Set(all.map(p => p.grade).filter(Boolean))].sort(), [all])

  const rows = useMemo(() => {
    let r = all.filter(p =>
      (!q || p.name.includes(q)) &&
      (!team || p.team === team) &&
      (!pos || p.pos1 === pos) &&
      (!grade || p.grade === grade)
    )
    r.sort((a, b) => {
      const av = a[sort.key] ?? -1, bv = b[sort.key] ?? -1
      if (typeof av === 'string') return av.localeCompare(bv) * sort.dir
      return (av - bv) * sort.dir
    })
    return r
  }, [all, q, team, pos, grade, sort])

  const click = (key) => setSort(s => s.key === key ? { key, dir: -s.dir } : { key, dir: -1 })
  const sortCols = [
    { key: 'total_points', label: '득점' },
    { key: 'kills', label: '공격' },
    { key: 'blocks', label: '블로킹' },
    { key: 'serve_aces', label: '서브에이스' },
    { key: 'digs', label: '디그' },
  ]

  return (
    <div className="page fade-up">
      <div className="page-head">
        <div className="eyebrow">Player Records</div>
        <h1 className="page-title">선수 기록</h1>
        <p className="page-sub">출전 선수 {all.length}명 · 검색하거나 헤더로 정렬</p>
      </div>

      <div className="filters">
        <div className="search">
          <span className="si"><Icon name="search" /></span>
          <input placeholder="선수 이름 검색" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="select" value={team} onChange={e => setTeam(e.target.value)}>
          <option value="">전체 팀</option>
          {teams.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="select" value={pos} onChange={e => setPos(e.target.value)}>
          <option value="">전체 포지션</option>
          {positions.map(p => <option key={p} value={p}>{POS_KR[p] || p}</option>)}
        </select>
        <select className="select" value={grade} onChange={e => setGrade(e.target.value)}>
          <option value="">전체 학년</option>
          {grades.map(g => <option key={g} value={g}>{g}학년</option>)}
        </select>
        <span className="result-count">{rows.length}명</span>
      </div>

      {rows.length === 0 ? (
        <div className="empty"><div className="ic">🔍</div>검색 결과가 없습니다.</div>
      ) : (
        <div className="card players-table-wrap scroll-area">
          <table className="players-table">
            <thead>
              <tr>
                <th className="l">선수</th>
                <th className="l">팀</th>
                <th>포지션</th>
                {sortCols.map(c => (
                  <th key={c.key} className={sort.key === c.key ? 'active' : ''} onClick={() => click(c.key)}>
                    {c.label}{sort.key === c.key ? (sort.dir === -1 ? ' ▼' : ' ▲') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p.team + p.jersey + i} onClick={() => setSel(p)}>
                  <td className="pl-name"><span className="pl-jersey">{p.jersey}</span><span className="n">{p.name}</span></td>
                  <td className="pl-team">{p.team}</td>
                  <td className="pl-pos"><span className="pos-tag">{POS_KR[p.pos1] || p.pos1 || '—'}</span></td>
                  <td className={sort.key === 'total_points' ? 'pl-hi' : ''}>{p.total_points}</td>
                  <td className={sort.key === 'kills' ? 'pl-hi' : ''}>{p.kills}</td>
                  <td className={sort.key === 'blocks' ? 'pl-hi' : ''}>{p.blocks}</td>
                  <td className={sort.key === 'serve_aces' ? 'pl-hi' : ''}>{p.serve_aces}</td>
                  <td className={sort.key === 'digs' ? 'pl-hi' : ''}>{p.digs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sel && <PlayerModal p={sel} onClose={() => setSel(null)} />}
    </div>
  )
}
