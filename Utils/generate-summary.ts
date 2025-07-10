import fs from 'fs';

const reportPath = 'results/report.json';
if (!fs.existsSync(reportPath)) {
  console.log('❌ No JSON report found.');
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

const total = report.suites.reduce((sum: any, suite: { specs: string | any[]; }) => sum + suite.specs.length, 0);
const failed = report.suites
  .flatMap(suite => suite.specs)
  .filter(spec => spec.tests.some((test: { results: any[]; }) => test.results.some(r => r.status === 'failed'))).length;
const skipped = report.suites
  .flatMap(suite => suite.specs)
  .filter(spec => spec.tests.every((test: { results: any[]; }) => test.results.every(r => r.status === 'skipped'))).length;
const passed = total - failed - skipped;

const summary = `
### 🧪 Playwright Test Summary
**Total Tests:** ${total}  
**✅ Passed:** ${passed}  
**❌ Failed:** ${failed}  
**⚠️ Skipped:** ${skipped}
`;

fs.writeFileSync(process.env.GITHUB_STEP_SUMMARY || 'summary.md', summary);
console.log(summary);