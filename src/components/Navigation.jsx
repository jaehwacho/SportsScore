import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Icon from './Icon'
import { NAV } from '../lib/format'
import './Navigation.css'

export default function Navigation({ tournamentIndex, activeTournamentId, onTournamentChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const activeTournament = tournamentIndex?.tournaments.find(t => t.id === activeTournamentId)
  const tournamentShortName = activeTournament?.name.split(' ').slice(-1)[0] || '대회'

  const handleTournamentSelect = (id) => {
    onTournamentChange(id)
    setIsDropdownOpen(false)
  }

  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <span className="ball" aria-hidden="true"></span>
        <span>{tournamentShortName}<small>{activeTournament?.name.split(' ')[0]} {activeTournament?.division}</small></span>
      </Link>

      <div className="tournament-picker">
        <button
          className="tournament-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="대회 선택"
        >
          <span>{tournamentShortName}</span>
          <Icon name="arrow" size={16} />
        </button>
        {isDropdownOpen && (
          <div className="tournament-dropdown">
            {tournamentIndex?.tournaments.map(t => (
              <button
                key={t.id}
                className={`tournament-option ${t.id === activeTournamentId ? 'active' : ''}`}
                onClick={() => handleTournamentSelect(t.id)}
              >
                <div className="tournament-name">{t.name}</div>
                <div className="tournament-date">{t.date_start} ~ {t.date_end}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <nav className="nav-menu">
        {NAV.map(n => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'}
            className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            {n.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export function TabBar() {
  return (
    <nav className="tabbar">
      {NAV.map(n => (
        <NavLink key={n.to} to={n.to} end={n.to === '/'}
          className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
          <span className="ic"><Icon name={n.icon} size={20} /></span>
          {n.label}
        </NavLink>
      ))}
    </nav>
  )
}
