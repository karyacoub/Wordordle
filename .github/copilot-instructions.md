# Copilot Instructions for Wordordle

## Project Overview
- **Wordordle** is a React + MobX word game, bootstrapped with Create React App.
- Main UI logic is in `src/components/` (Keyboard, Letter, LetterBoard, NavBar, Root).
- State management uses MobX, with stores in `src/mobx/` (see `RootStore.ts`).
- Game models and constants are in `src/models/` (Word, Constants, Enums).
- Styling uses SCSS modules in `src/styles/`.

## Build & Run
- Use `npm start` for development (auto-reloads, shows lint errors).
- Use `npm run build` for production builds (output in `build/`).
- Use `npm test` for running tests (Jest + React Testing Library).
- Deployment uses `gh-pages` via `npm run deploy` (see `homepage` in `package.json`).
- If you encounter dependency conflicts (e.g., with TypeScript), prefer using `--legacy-peer-deps` with npm install.

## Key Patterns & Conventions
- **MobX**: State is observable; UI reacts to store changes. Stores are composed in `RootStore.ts`.
- **Component Structure**: Each UI element (keyboard, letter, board) is a separate component in `src/components/`.
- **Models**: Game logic and data types are defined in `src/models/`.
- **SCSS**: Styles are modular; each major component has a corresponding SCSS file.
- **TypeScript**: All code is typed; interfaces/enums in `src/models/`.
- **Testing**: Tests use React Testing Library; test files are colocated with components or in a dedicated test folder (if present).

## Integration Points
- **External Libraries**: Uses MobX, Immutable.js, React Cookie, and SCSS.
- **No custom backend**: All logic is client-side; external APIs are not used.
- **Deployment**: Static site hosted on GitHub Pages.

## Examples
- To add a new game feature, update models in `src/models/`, state logic in `src/mobx/`, and UI in `src/components/`.
- To style a new component, create a SCSS file in `src/styles/` and import it in the component.

## Troubleshooting
- For npm dependency issues, use `npm install --legacy-peer-deps`.
- For build errors, check TypeScript types and MobX observability.

---
_If any section is unclear or missing, please provide feedback to improve these instructions._
