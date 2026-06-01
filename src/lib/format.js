// 포맷 헬퍼 & 상수
export function fmtDate(iso) {
  const d = new Date(iso)
  return `${d.getMonth() + 1}.${d.getDate()}`
}

export function fmtLong(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export const NAV = [
  { to: '/', label: '홈', icon: 'home' },
  { to: '/schedule', label: '일정·결과', icon: 'cal' },
  { to: '/bracket', label: '대진표', icon: 'trophy' },
  { to: '/teams', label: '팀 순위', icon: 'chart' },
  { to: '/players', label: '선수 기록', icon: 'people' },
]

export const POS_KR = { OH: '레프트', MB: '센터', OP: '라이트', S: '세터', Li: '리베로', L: '리베로' }
