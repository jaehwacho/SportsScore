# 🏐 SportsScore - 한국중고배구 여고부 경기 결과 사이트

한국중고배구 여고부 연맹전의 경기 결과를 PC·모바일에서 쉽게 볼 수 있는 통합 결과 사이트입니다.

## ✨ 주요 기능

### 대회 관리
- 📌 **멀티 대회 지원** — 여러 대회 누적 표시 (단양대회, 삼척대회)
- 🔄 **대회 선택기** — 상단 네비게이션에서 대회 전환
- 🔗 **URL 공유** — `?t=samcheok_2026` 형태로 특정 대회 링크 공유 가능

### 페이지
- **홈** - 현재 대회 개요, 우승·준우승 팀, 통계, 빠른 이동 메뉴
- **일정·결과** - 경기 리스트 (날짜별), 세트별 상세 스코어
- **대진표** - 토너먼트 브래킷 (예선 → 4강 → 결승, 대회별 동적 라운드)
- **팀 순위** - 종합 순위표 (정렬 기능, 모바일 카드형)
- **선수 기록** - 선수 통합 테이블 (검색/필터/정렬)

## 📊 데이터

### 2026 춘계 단양대회 (3/13~19)
- 경기: 14경기 | 팀: 9개 | 선수: 103명

### 2026 1차 연맹전 삼척대회 (4/7~13)
- 경기: 12경기 | 팀: 7개 | 선수: 75명

**데이터 형식**: JSON (tournaments.json 인덱스 + 각 대회별 데이터 파일)

## 💻 기술 스택

| 분야 | 기술 |
|------|------|
| **Framework** | React 18 + React Router v6 |
| **Build** | Vite (빌드 시간 ~300ms) |
| **Styling** | CSS3 (oklch 컬러 시스템, CSS 변수) |
| **Font** | Pretendard (본문) + Archivo (제목) |
| **Data** | Static JSON (대회별 1파일) |
| **Deploy** | Vercel (GitHub 자동 연동) |

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버
```bash
npm run dev
# http://localhost:3000 접속
```

### 프로덕션 빌드
```bash
npm run build
# dist/ 폴더 생성
```

## 📦 배포

### Vercel (권장 - 자동 배포)
GitHub에 push하면 **자동으로 배포됨**
- **Production**: https://sportsscore-ivory.vercel.app
- **Preview**: 각 PR마다 자동 생성

## 📁 프로젝트 구조

```
SportsScore/
├── public/
│   └── data/
│       ├── tournaments.json              (대회 인덱스)
│       ├── danyang_2026_data.json       (단양대회 데이터)
│       └── samcheok_2026_data.json      (삼척대회 데이터)
├── src/
│   ├── App.jsx                          (라우팅 + 데이터 로드)
│   ├── App.css
│   ├── index.css                        (토큰 + 전역 스타일)
│   ├── components/
│   │   ├── Navigation.jsx               (상단 네비 + 대회 선택)
│   │   ├── Navigation.css
│   │   └── Icon.jsx                     (SVG 아이콘)
│   ├── pages/
│   │   ├── Home.jsx / Home.css
│   │   ├── Schedule.jsx / Schedule.css
│   │   ├── Bracket.jsx / Bracket.css
│   │   ├── Teams.jsx / Teams.css
│   │   └── Players.jsx / Players.css
│   ├── lib/
│   │   └── format.js                    (유틸리티 함수)
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── vercel.json
```

## 🎨 디자인

- **테마**: 화이트 배경 + 비비드 오렌지/코랄 포인트
- **색상 시스템**: oklch() 기반 (장기적 유지보수 용이)
- **반응형**: 모바일 우선 설계
  - 📱 모바일 (≤480px): 하단 탭바, 카드형 레이아웃
  - 💻 PC (≥721px): 상단 네비, 테이블형 레이아웃
- **성능**: 모바일 첫 로딩 2초 이내

## 📊 성능 지표

| 항목 | 수치 |
|------|------|
| **빌드 시간** | ~324ms |
| **CSS (gzip)** | 5.51 kB |
| **JS (gzip)** | 60.13 kB |
| **총 번들** | ~65 kB |

## ⚠️ 중요 사항

**데이터 저작권**: 본 사이트의 경기 데이터는 한국중고배구연맹의 자산입니다.
공개 게시 전 **한국중고배구연맹의 서면 허가**를 반드시 확인하세요.

## 📝 라이선스

MIT License (데이터 제외)

---

**Created**: 2026-05-30  
**Last Updated**: 2026-05-30  
**Version**: 2.0.0 (멀티 대회 지원)
