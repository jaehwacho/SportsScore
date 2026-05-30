import { NavLink, Link } from 'react-router-dom'
import Icon from './Icon'
import { NAV } from '../lib/format'
import './Navigation.css'

export default function Navigation() {
  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <span className="ball" aria-hidden="true"></span>
        <span>단양대회<small>2026 여고부</small></span>
      </Link>
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
