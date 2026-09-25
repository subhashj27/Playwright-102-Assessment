# Playwright 102 Assignment - JavaScript

This project implements the three scenarios from the supplied **Playwright 102 Assignment Task** PDF against the TestMu AI Selenium Playground.

## Source requirements covered

### Scenario 1 - Simple Form Demo
- Open Selenium Playground.
- Click **Simple Form Demo**.
- Validate URL contains `simple-form-demo`.
- Store the message in a JavaScript variable.
- Enter the variable in the message field.
- Click **Get Checked Value**.
- Assert the same message under **Your Message**.

### Scenario 2 - Drag & Drop Sliders
- Open Selenium Playground.
- Click **Drag & Drop Sliders**.
- Locate the slider whose starting value is `15`.
- Drag it to `95`.
- Assert the range value is `95`.

### Scenario 3 - Input Form Submit
- Open Selenium Playground.
- Click **Input Form Submit**.
- Submit the empty form.
- Assert the browser validation message `Please fill in this field.`.
- Fill all fields.
- Select **United States** by visible text.
- Submit.
- Assert `Thanks for contacting us, we will get back to you shortly.`.

The assignment also asks for HyperExecute execution across at least two OS/browser combinations and for artifacts, secrets, environment variables, pre steps/dependency caching, with post steps optional. Those pieces are represented in `hyperexecute.yaml`.

## Project structure

```text
playwright-102-assignment-js/
├── pages/
│   ├── input-form.page.js
│   ├── selenium-playground.page.js
│   ├── simple-form.page.js
│   └── slider.page.js
├── tests/
│   ├── scenario1-simple-form.spec.js
│   ├── scenario2-slider.spec.js
│   └── scenario3-input-form.spec.js
├── test-data/
│   └── test-data.json
├── .github/
│   └── workflows/
├── hyperexecute.yaml
├── package.json
├── playwright.config.js
├── .gitignore
└── README.md
```

## Local setup in VS Code

### 1. Prerequisites

Install Node.js LTS and VS Code.

Verify Node/npm:

```bash
node --version
npm --version
```

### 2. Open the project

In VS Code:

**File → Open Folder → playwright-102-assignment-js**

### 3. Install dependencies

Open the VS Code terminal:

```bash
npm install
npx playwright install chromium
```

### 4. Run all tests

```bash
npm test
```

### 5. Run individual scenarios

```bash
npm run test:scenario1
npm run test:scenario2
npm run test:scenario3
```

### 6. Run headed

```bash
npm run test:headed
```

### 7. Debug

```bash
npm run test:debug
```

### 8. View HTML report

```bash
npm run report
```

## Important implementation details

### Scenario 1 selector

The live Simple Form Demo reuses the `user-message` id on wrapper elements. Therefore the project intentionally uses:

```js
page.locator('input#user-message')
```

instead of a bare `#user-message`.

### Scenario 2 slider

The test does not depend on a hard-coded slider index. It searches all range inputs for the one whose current value is `15`, then performs an actual mouse drag based on the slider's min/max/value geometry.

### Scenario 3 required-field validation

The required-field message is browser-native HTML validation text and can vary slightly by browser. It is therefore checked through:

```js
element.validationMessage
```

rather than searching for a normal DOM error element.

## HyperExecute

The assignment requires parallel execution on at least two different OS/browser combinations. `hyperexecute.yaml` uses a matrix with:

- Windows
- Linux
- Chrome latest

The YAML also demonstrates:

- `pre` steps
- npm dependency caching
- environment variable injection
- Secret Management placeholders
- retries
- Playwright HTML/JUnit reports
- screenshots/videos/traces through Playwright
- artifact upload
- merged artifacts
- optional post step

### Before running HyperExecute

Create HyperExecute secrets for your TestMu AI credentials. Do **not** commit access keys to Git.

The supplied YAML keeps the secret references commented so the project is safe to push to GitHub. If your HyperExecute setup requires the credentials as environment variables, uncomment the secret-backed `env` block.

Then run the HyperExecute CLI from the project root, for example:

```bash
./hyperexecute --config hyperexecute.yaml
```

On Windows, use the HyperExecute executable provided for Windows by TestMu AI.

## GitHub

The supplied assignment asks you to push the project to GitHub and keep the repository private, then share it with the specified certification administrator account.

Do not commit:
- access keys
- passwords
- `.env` files
- HyperExecute credentials

## Notes

The test target is a public TestMu AI Selenium Playground, so network availability can affect execution. Playwright is configured to capture screenshots and videos on every test, with trace collection on first retry.
