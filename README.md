# Custom Selection

A small React custom selection component demo. It supports standard selection and searchable selection modes, with checkbox controls that let you change the component behavior while the app is running.

## Features

- Select an option from a custom dropdown.
- Search and filter options with a text input.
- Clear the current selection with an `X` button.
- Disable the selection control.
- Show a loading state while options are unavailable.
- Close the search suggestions by clicking outside the component.
- Toggle the demo controls with checkboxes:
	- Clearable
	- Searchable
	- Disabled
	- Grouped
	- Multi

## Getting Started

### Requirements

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

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

## How It Works

The component starts in regular select mode. Enable **Searchable** to switch to a text input. Typing filters the available languages using a case-insensitive search, and selecting a suggestion closes the list. Search input changes are passed to `onSearchHandler` when supplied.

Enable **Clearable** to show the clear button. The button resets the current search text and selection. Enable **Disabled** to prevent interaction with the selection control and clear button. **Loading** displays a loading label and temporarily prevents the menu from opening.

Enable **Multi** to select more than one option. Selected values are displayed as removable chips. **Grouped** renders grouped option data and creates a default `Languages` group for the built-in flat list.

The current option list is defined in `src/App.jsx`:

```js
[
	"Java",
	"Go",
	"C",
	"C#",
	"C++",
	"Rust",
	"JavaScript",
	"Python",
]
```

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
└── src
		├── App.jsx       # Custom select component and demo controls
		├── App.css       # Component styles
		├── index.css     # Global styles
		└── main.jsx      # React entry point
```

## Component API

`CustomSelect` accepts these props:

| Prop | Type | Purpose |
| --- | --- | --- |
| `isClearable` | `boolean` | Clear button state |
| `isSearchable` | `boolean` | Search mode state |
| `isDisabled` | `boolean` | Disabled state |
| `isLoading` | `boolean` | Loading state |
| `options` | `array` | String options, option objects, or groups |
| `value` | `string`, object, or array | Current selected value(s) |
| `placeholder` | `string` | Input/select placeholder |
| `isGrouped` | `boolean` | Grouped options state |
| `isMulti` | `boolean` | Multi-select state |
| `onChangeHandler` | `function` | Selection change callback |
| `onChange` | `function` | React-select-style selection callback |
| `onMenuOpen` | `function` | Menu-open callback |
| `onSearchHandler` | `function` | Search input callback |

Option objects follow the same basic shape as `react-select`:

```js
{ value: "javascript", label: "JavaScript", isDisabled: false }
```

Grouped options use `{ label, options }`. `onChange` and `onChangeHandler` receive the selected option, an array in multi mode, or `null` when cleared. `onMenuOpen` runs when the menu opens.

## Technologies

- React 18
- Vite
- PropTypes
- ESLint