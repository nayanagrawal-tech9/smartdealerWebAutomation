# SmartdealerWebAutomation (Playwright + Mocha + TypeScript)

This project automates the Smartdealer web application using **Playwright**, **Mocha** as the test runner, and **TypeScript**. It follows a modular structure using the **Page Object Model (POM)** and includes utilities for dynamic test data such as email generation.

---

## 📁 Project Structure

```
SmartdealerWebAutomation/
├── tests/                 # Mocha test specs
├── PageObjects/           # Page Object Model classes
├── utils/                 # Utility helpers (e.g., email generators)
├── screenshots/           # Failure screenshots (auto-generated)
├── playwright.config.ts   # Playwright test configuration
├── tsconfig.json          # TypeScript compiler options
├── package.json           # Project dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/SmartdealerWebAutomation.git
cd SmartdealerWebAutomation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Tests
```bash
npx mocha -r ts-node/register tests/**/*.ts
```

### 4. Run Specific Test File
```bash
npx mocha -r ts-node/register tests/login/login.spec.ts
```

---

## 🧪 Features
- Playwright for fast browser automation
- Mocha for flexible test execution
- Page Object Model for clean code reuse
- TypeScript support for strong typing
- Utility functions for dynamic test data

---

## 🛠️ Sample Utility
```ts
// utils/emailUtils.ts
export function generateAutomationEmail(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const timestamp = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `AutomationUser${timestamp}@yopmail.com`;
}
```

---

## 📷 Screenshots on Failure
Screenshots are captured automatically on test failure and saved to `/screenshots`.

---

## 📌 Notes
- Make sure to adjust your environment configuration in `playwright.config.ts`.
- You can extend the framework with additional utilities, data-driven tests, and reporting integrations.

---

## 📞 Need Help?
Feel free to reach out to the maintainer for support or suggestions.

---

Happy Testing! 🚀
