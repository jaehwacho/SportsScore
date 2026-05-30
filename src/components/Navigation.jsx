import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">⚪ 단양대회</Link>
        <ul className="nav-menu">
          <li><Link to="/">홈</Link></li>
          <li><Link to="/schedule">일정·결과</Link></li>
          <li><Link to="/bracket">대진표</Link></li>
          <li><Link to="/teams">팀 순위</Link></li>
          <li><Link to="/players">선수 기록</Link></li>
        </ul>
      </div>
    </nav>
  )
}
