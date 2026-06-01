// 공용 SVG 아이콘
export default function Icon({ name, size = 16 }) {
  const s = { width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    chevDown: <path d="M4 7l5 5 5-5" />,
    arrow: <path d="M5 10h10M11 6l4 4-4 4" />,
    search: <g><circle cx="8" cy="8" r="5.2" /><path d="M15 15l-3.2-3.2" /></g>,
    close: <path d="M5 5l9 9M14 5l-9 9" />,
    info: <g><circle cx="9" cy="9" r="7.2" /><path d="M9 8.4v4M9 5.8h.01" /></g>,
    cal: <g><rect x="3" y="4" width="13" height="12" rx="2" /><path d="M3 8h13M6.5 2.5v3M12.5 2.5v3" /></g>,
    trophy: <g><path d="M6 3h7v3a3.5 3.5 0 01-7 0z" /><path d="M6 4H4v1a2 2 0 002 2M13 4h2v1a2 2 0 01-2 2M9.5 9.3V12M7 15h5M8 12h3l.4 3H7.6z" /></g>,
    chart: <g><path d="M3 16V3M3 16h13M7 13V9M11 13V6M15 13v-4" /></g>,
    people: <g><circle cx="7" cy="6.5" r="2.6" /><path d="M2.5 15c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" /><path d="M13 5.6a2.4 2.4 0 010 4.6M14 15c0-1.6-.6-3-1.8-3.6" /></g>,
    home: <path d="M3 8l6-5 6 5v7a1 1 0 01-1 1H4a1 1 0 01-1-1z" />,
  }
  return <svg viewBox="0 0 18 18" style={s} aria-hidden="true">{paths[name]}</svg>
}
