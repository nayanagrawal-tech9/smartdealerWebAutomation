import fs from 'fs';

const reportPath = 'results/report.json';
if (!fs.existsSync(reportPath)) {
  console.log('❌ No JSON report found.');
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Types
interface TestResult {
  status: string;
}

interface Test {
  results: TestResult[];
}

interface Spec {
  tests: Test[];
  status?: string;
}

interface Suite {
  specs: Spec[];
}

let total = 0;
let failed = 0;
let skipped = 0;

(report.suites as Suite[]).forEach((suite) => {
  suite.specs.forEach((spec) => {
    total++;

    const allTests = spec.tests || [];

    if (allTests.length === 0 && spec.status) {
      // fallback for crashed/untracked tests
      if (spec.status === 'failed') failed++;
      else if (spec.status === 'skipped') skipped++;
    } else {
      const hasFailure = allTests.some(test =>
        test.results.some(result => result.status === 'failed')
      );
      const allSkipped = allTests.every(test =>
        test.results.every(result => result.status === 'skipped')
      );

      if (hasFailure) failed++;
      else if (allSkipped) skipped++;
    }
  });
});

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
