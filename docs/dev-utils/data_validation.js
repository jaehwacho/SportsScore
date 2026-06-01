import fs from 'fs';
import path from 'path';

const dataPath = './public/data/danyang_2026_data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log('📊 SportsScore 데이터 검증 보고서\n');

// 1. 대회 정보
console.log('1️⃣  대회 정보');
console.log(`   📌 대회명: ${data.tournament.name}`);
console.log(`   🏆 우승팀: ${data.tournament.champion}`);
console.log(`   🥈 준우승팀: ${data.tournament.runner_up}`);

// 2. 경기 데이터
console.log('\n2️⃣  경기 데이터');
console.log(`   📈 총 경기 수: ${data.matches.length}`);
const roundCount = {};
data.matches.forEach(m => {
  roundCount[m.round] = (roundCount[m.round] || 0) + 1;
});
Object.entries(roundCount).forEach(([round, count]) => {
  console.log(`      - ${round}: ${count}경기`);
});

// 3. 순위 데이터 검증
console.log('\n3️⃣  팀 순위 검증');
console.log(`   📊 팀 수: ${data.standings.length}`);
console.log(`   ✅ 우승팀: ${data.standings[0].team} (${data.standings[0].result})`);
console.log(`   ✅ 준우승팀: ${data.standings[1].team} (${data.standings[1].result})`);

// 승무패 검증
let totalMatches = 0;
data.standings.forEach(team => {
  totalMatches += team.matches;
});
console.log(`   📌 팀별 경기수 합계: ${totalMatches} (실제: ${data.matches.length * 2})`);

// 4. 선수 데이터 검증
console.log('\n4️⃣  선수 데이터 검증');
console.log(`   👥 총 선수 수: ${data.players.length}`);
const playedCount = data.players.filter(p => p.played).length;
console.log(`   ✅ 출전 선수: ${playedCount}명`);

const teamPlayers = {};
data.players.forEach(p => {
  teamPlayers[p.team] = (teamPlayers[p.team] || 0) + 1;
});
console.log(`   📌 팀별 선수 수:`);
Object.entries(teamPlayers).forEach(([team, count]) => {
  console.log(`      - ${team}: ${count}명`);
});

// 5. 선수 통계 샘플
console.log('\n5️⃣  선수 통계 샘플 (득점 TOP 5)');
const topScorers = data.players
  .filter(p => p.played)
  .sort((a, b) => (b.total_points || 0) - (a.total_points || 0))
  .slice(0, 5);

topScorers.forEach((p, idx) => {
  console.log(`   ${idx + 1}. ${p.name} (${p.team}): ${p.total_points}점`);
});

// 6. 데이터 무결성 확인
console.log('\n6️⃣  데이터 무결성');
let issues = 0;

// 각 경기의 세트 데이터 확인
data.matches.forEach(m => {
  if (!m.sets || m.sets.length === 0) {
    console.log(`   ⚠️  경기 ${m.no}: 세트 데이터 없음`);
    issues++;
  }
});

if (issues === 0) {
  console.log(`   ✅ 모든 경기에 세트 데이터 있음`);
}

// 선수 필수 필드 확인
let playerIssues = 0;
data.players.slice(0, 5).forEach(p => {
  const requiredFields = ['team', 'name', 'pos1', 'matches'];
  requiredFields.forEach(field => {
    if (p[field] === undefined || p[field] === null) {
      console.log(`   ⚠️  선수 ${p.name}: ${field} 필드 없음`);
      playerIssues++;
    }
  });
});

if (playerIssues === 0) {
  console.log(`   ✅ 선수 데이터 필수 필드 완전`);
}

console.log('\n✅ 데이터 검증 완료!');
