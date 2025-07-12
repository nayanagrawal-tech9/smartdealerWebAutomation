import fs from 'fs';

const reportPath = 'results/report.json';
if (!fs.existsSync(reportPath)) {
  console.log('❌ No JSON report found.');
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Define types for specs and tests
interface TestResult {
  status: string;
}

interface Test {
  results: TestResult[];
}

interface Spec {
  tests: Test[];
}

interface Suite {
  specs: Spec[];
}

const total = (report.suites as Suite[]).reduce((sum: number, suite: Suite) => sum + suite.specs.length, 0);

const failed = (report.suites as Suite[])
  .flatMap((suite: Suite) => suite.specs)
  .filter((spec: Spec) =>
    spec.tests.some((test: Test) =>
      test.results.some((r: TestResult) => r.status === 'failed')
    )
  ).length;

const skipped = (report.suites as Suite[])
  .flatMap((suite: Suite) => suite.specs)
  .filter((spec: Spec) =>
    spec.tests.every((test: Test) =>
      test.results.every((r: TestResult) => r.status === 'skipped')
    )
  ).length;

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
