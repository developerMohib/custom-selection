# Custom Selection Demo

This project is a small React + Vite demo for a custom dropdown/select component. It shows how a selection UI can support multiple states such as single select, multi-select, searchable dropdowns, grouped options, disabled mode, loading mode, and clearable values.

The app is intentionally designed as a front-end demo, not as a production data layer. The options are defined locally inside the component, and the UI toggles are controlled by checkbox inputs placed below the select.

## Features

- Single-select behavior
- Multi-select behavior with removable chips
- Search/filter input for options
- Clear selection using an X button
- Disabled state
- Loading state
- Grouped option support
- Click-outside close behavior
- Demo controls that let you switch modes at runtime

## Default data

The component starts with this list:

```js
["Java", "Go", "C", "C#", "C++", "Rust", "JavaScript", "Python"]
```

It also supports option objects like:

```js
{ value: "javascript", label: "JavaScript", isDisabled: false }
```

And grouped data like:

```js
{ label: "Languages", options: [...] }
```

## Getting started

### Requirements

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the app in development mode

```bash
npm run dev
```

Then open the local URL shown by Vite in the terminal, usually:

```text
http://localhost:5173
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Project structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── main.jsx
```

## Component behavior

The main component lives in [src/App.jsx](src/App.jsx). It exports a `CustomSelect` component that accepts props such as:

- `isClearable`
- `isSearchable`
- `isDisabled`
- `isLoading`
- `options`
- `value`
- `placeholder`
- `isGrouped`
- `isMulti`
- `onChangeHandler`
- `onChange`
- `onMenuOpen`
- `onSearchHandler`

### Demo controls

The app includes checkboxes below the selector that toggle the following states:

- Clearable
- Searchable
- Disabled
- Loading
- Grouped
- Multi

This makes it easy to test the component behavior without modifying code.

## Important note

This is a demo component built for learning and UI experimentation. It is not built for large-scale production use with very large option lists, because it uses local filtering in the browser and keeps data in memory. For a real production app with thousands or millions of records, you would normally move the search and filtering to a backend API and add pagination or virtualization.

## Tech stack

- React 18
- Vite
- PropTypes
- ESLint

## Summary

This app demonstrates a custom dropdown/select component in a simple, interactive way. It is useful for learning component state patterns, custom menu behavior, and option filtering, but it should be treated as a demo implementation rather than a full production-ready data-driven selector.