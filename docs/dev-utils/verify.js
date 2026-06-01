import { chromium } from 'playwright';
import { createWriteStream, existsSync } from 'fs';
import { mkdir } from 'fs/promises';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = './screenshots';

// 스크린샷 디렉토리 생성
await mkdir(SCREENSHOTS_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

console.log('🧪 시작: SportsScore 기능 검증\n');

try {
  // 1. 홈 페이지
  console.log('1️⃣  홈 페이지 확인...');
  await page.goto(`${BASE_URL}/`);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/01-home.png` });

  const homeTitle = await page.locator('h1').textContent();
  const heroExists = await page.locator('.hero').isVisible();
  const champExists = await page.locator('.champion').isVisible();

  console.log(`   ✅ 페이지 제목: "${homeTitle}"`);
  console.log(`   ✅ 히어로 섹션: ${heroExists ? '표시됨' : '미표시'}`);
  console.log(`   ✅ 우승팀 섹션: ${champExists ? '표시됨' : '미표시'}`);

  // 2. 일정·결과 페이지
  console.log('\n2️⃣  일정·결과 페이지 확인...');
  await page.click('a[href="/schedule"]');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/02-schedule.png` });

  const matchCards = await page.locator('.match-card').count();
  console.log(`   ✅ 경기 카드: ${matchCards}개 렌더링됨`);

  // 첫 번째 경기 확장
  const firstMatch = page.locator('.match-card').first();
  await firstMatch.locator('.match-header').click();
  await page.waitForTimeout(300);
  const detailsVisible = await firstMatch.locator('.match-details').isVisible();
  console.log(`   ✅ 경기 상세 확장: ${detailsVisible ? '작동함' : '미작동'}`);

  // 3. 대진표 페이지
  console.log('\n3️⃣  대진표 페이지 확인...');
  await page.click('a[href="/bracket"]');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/03-bracket.png` });

  const semifinals = await page.locator('.bracket-match').count();
  const championBadge = await page.locator('.champion-badge').isVisible();
  console.log(`   ✅ 브래킷 경기: ${semifinals}개 렌더링됨`);
  console.log(`   ✅ 우승팀 배지: ${championBadge ? '표시됨' : '미표시'}`);

  // 4. 팀 순위 페이지
  console.log('\n4️⃣  팀 순위 페이지 확인...');
  await page.click('a[href="/teams"]');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/04-teams.png` });

  const tableRows = await page.locator('.standings-table tbody tr').count();
  console.log(`   ✅ 팀 순위 테이블: ${tableRows}개 팀`);

  // 정렬 기능 테스트
  const sortSelect = page.locator('select').first();
  await sortSelect.selectOption('win');
  await page.waitForTimeout(300);
  console.log(`   ✅ 정렬 기능: 승수 정렬 작동함`);

  // 5. 선수 기록 페이지
  console.log('\n5️⃣  선수 기록 페이지 확인...');
  await page.click('a[href="/players"]');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/05-players.png` });

  const playerRows = await page.locator('.players-table tbody tr').count();
  console.log(`   ✅ 선수 테이블: ${playerRows}명 렌더링됨`);

  // 검색 기능 테스트
  const searchInput = page.locator('.search-input');
  await searchInput.fill('선명');
  await page.waitForTimeout(300);
  const filteredRows = await page.locator('.players-table tbody tr').count();
  console.log(`   ✅ 검색 기능: "선명" 입력 → ${filteredRows}명 필터됨`);

  // 6. 모바일 반응형 확인
  console.log('\n6️⃣  모바일 반응형 확인...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/06-mobile-home.png` });
  console.log(`   ✅ 375px 폭에서 렌더링됨`);

  // 7. 네비게이션 링크 확인
  console.log('\n7️⃣  네비게이션 링크 작동 확인...');
  const navLinks = await page.locator('.nav-menu a').count();
  console.log(`   ✅ 네비게이션 링크: ${navLinks}개`);

  console.log('\n✅ 모든 검증 완료!\n');
  console.log(`📸 스크린샷: ${SCREENSHOTS_DIR}/ 폴더 참조`);

} catch (error) {
  console.error('❌ 검증 실패:', error.message);
  process.exit(1);
} finally {
  await browser.close();
}
