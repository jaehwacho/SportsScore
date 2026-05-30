# 🏐 SportsScore - 단양대회 결과 웹사이트

2026 춘계중고배구연맹전 단양대회(여고부) 경기 결과를 보여주는 반응형 웹사이트입니다.

## 🚀 기능

- **홈** - 대회 개요, 우승팀, 빠른 이동 메뉴
- **일정·결과** - 14경기 일정 및 세트별 상세 스코어
- **대진표** - 6강 → 4강 → 결승 토너먼트 브래킷
- **팀 순위** - 9개 팀 종합 순위표 (정렬 기능 포함)
- **선수 기록** - 111명 선수 정보 (검색/필터/정렬)

## 📊 데이터

- 경기 수: 14경기
- 참여 팀: 9개
- 출전 선수: 103명
- 데이터 형식: JSON (danyang_2026_data.json)

## 💻 기술 스택

- **Frontend**: React 18 + React Router v6
- **Build Tool**: Vite
- **Styling**: CSS3 (변수 활용)
- **Data**: Static JSON

## 🏃 개발

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000` 접속

### 프로덕션 빌드
```bash
npm run build
```

## 📦 배포

### Netlify (권장)
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

## 📄 라이선스 및 주의사항

**⚠️ 중요**: 본 사이트의 경기 데이터는 한국중고배구연맹의 자산입니다.
공개 게시 전 **한국중고배구연맹의 사용·게시 허가**를 반드시 확인하세요.

## 📱 반응형 지원

- ✅ PC (1200px 이상)
- ✅ 태블릿 (768px~1199px)
- ✅ 모바일 (480px 이하)

## ✨ 성능

- **첫 로딩**: 2초 이내 ✅
- **번들 크기** (gzip):
  - CSS: 3.07 kB
  - JS: 56.66 kB
  - 총합: ~60 kB

## 📝 프로젝트 구조

```
SportsScore/
├── public/
│   └── data/
│       └── danyang_2026_data.json
├── src/
│   ├── components/
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Schedule.jsx
│   │   ├── Bracket.jsx
│   │   ├── Teams.jsx
│   │   └── Players.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

**Created**: 2026-05-30
**Version**: 1.0.0
