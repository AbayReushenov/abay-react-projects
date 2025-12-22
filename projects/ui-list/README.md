# Create a new project with React and TypeScript

### ✅ Recommended Path: Start Fresh with Modern Tools

#### **Option 1: Use Vite (Fast & Modern - Recommended)**

Vite is the current standard for new React projects. It's significantly faster and uses up-to-date dependencies.

```bash
# Create a new project with React and TypeScript
npm create vite@latest hello-world -- --template react-ts
cd hello-world
npm install
npm run dev
```

#### **Option 2: Use the Current React Ecosystem**

If you prefer to follow React's official guidance more closely, you can set up a project manually using the latest versions. React 19 is now available.

1.  **Create a new directory and initialize a project:**
    ```bash
    mkdir react-19-app && cd react-19-app
    npm init -y
    ```

2.  **Install the latest stable packages:**
    ```bash
    npm install react@^19.0.0 react-dom@^19.0.0
    npm install -D typescript @types/react@^19.0.0 @types/react-dom@^19.0.0 vite @vitejs/plugin-react
    ```

3.  **You would then need to configure `vite.config.ts`, `tsconfig.json`, and your project files.** For a simple start, **Option 1 (using the Vite template) handles all this for you automatically.**

### ❌ What to Avoid

*   **Using the old `package.json`**: Continuing with the outdated CRA setup will leave you with a project built on unmaintained foundations.
*   **Installing with `--force` or `--legacy-peer-deps`**: These flags bypass warnings to force installation, but they don't solve the underlying problem of using deprecated tooling.

In summary, the most efficient way to get a clean, modern "Hello World" project running without deprecation warnings is to use the Vite command in **Option 1**.

If you decide to proceed with Vite, I can provide the exact code for your `src/App.tsx` and other necessary files to recreate your "Hello World" screen.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


