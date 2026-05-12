# React Multi-Select Dropdown

A customizable, searchable, lightweight React multi-select dropdown component with checkbox support, async loading, grouping, and TypeScript support.

**NPM Package:** `@learnforjob/react-multi-select-dropdown`

## 📁 Project Structure

This repository contains two folders:

```
npm-dropdown/
├── multi-select-dropdown/    # 📦 NPM Package Source Code
│   ├── src/                 # TypeScript source files
│   ├── dist/                # Built files (after npm run build)
│   └── README.md            # Package documentation
└── npm-dropdown-example/    # 🎮 Live Example Application
    ├── src/App.js           # All usage examples
    └── README.md            # Example documentation
```

---

## 📦 Package Folder (`multi-select-dropdown/`)

This is the actual NPM package that you install in your projects.

### Installation (for users)

```bash
npm install @learnforjob/react-multi-select-dropdown
```

### Development Setup

```bash
cd multi-select-dropdown
npm install
```

#### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the package (Rollup → CJS + ESM + TypeScript declarations) |
| `npm run dev` | Watch mode - rebuilds on file changes |

### Quick Start

```jsx
import React, { useState } from 'react';
import { MultiSelectDropdown } from '@learnforjob/react-multi-select-dropdown';

function App() {
  const [selected, setSelected] = useState([]);
  
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ];

  return (
    <MultiSelectDropdown
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select frameworks"
    />
  );
}
```

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Option[]` | `[]` | Array of `{label, value}` objects |
| `value` | `(string \| number)[]` | `[]` | Currently selected values |
| `onChange` | `(values) => void` | required | Callback when selection changes |
| `placeholder` | `string` | `"Select options"` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the dropdown |
| `selectAllText` | `string` | `"Select All"` | Text for select all checkbox |
| `searchable` | `boolean` | `true` | Show/hide search input |
| `groupBy` | `string` | `undefined` | Property to group options by |
| `maxSelectionLimit` | `number` | `undefined` | Maximum selections allowed |
| `renderOption` | `(option) => ReactNode` | - | Custom option renderer |
| `renderTag` | `(option) => ReactNode` | - | Custom tag renderer |
| `customClassName` | `string` | `undefined` | Additional CSS class |
| `theme` | `Theme` | `undefined` | Custom theme object |

### Theme Properties

| Property | Type | Default |
|----------|------|---------|
| `primaryColor` | `string` | `#339ef7` |
| `primaryHover` | `string` | `#1a8ceb` |
| `bgColor` | `string` | `#ffffff` |
| `borderColor` | `string` | `#cccccc` |
| `textColor` | `string` | `#333333` |
| `placeholderColor` | `string` | `#495057` |
| `itemHoverBg` | `string` | `#ebf5ff` |
| `selectedBg` | `string` | `#339ef7` |
| `selectedColor` | `string` | `#ffffff` |
| `disabledBg` | `string` | `#e9ecef` |
| `disabledColor` | `string` | `#b3b3b3` |
| `borderRadius` | `string` | `4px` |
| `fontSize` | `string` | `1rem` |
| `headerHeight` | `string` | `36px` |

---

## 🎮 Example Folder (`npm-dropdown-example/`)

A complete working demo showing all features.

### Running the Example

```bash
cd npm-dropdown-example
npm install
npm start
```

Open `http://localhost:3000` to see all examples interactively.

### Features Demonstrated

| # | Feature |
|---|---------|
| 1️⃣ | Basic usage with options |
| 2️⃣ | Pre-selected (default) values |
| 3️⃣ | Disabled state |
| 4️⃣ | Max selection limit |
| 5️⃣ | Custom "Select All" text |
| 6️⃣ | Toggle search bar on/off |
| 7️⃣ | Grouped options (`groupBy`) |
| 8️⃣ | Custom option & tag rendering |
| 9️⃣ | Custom CSS class |
| 🔟 | Dynamic/async options |

---

## 🔧 Development

### Build the Package

```bash
cd multi-select-dropdown
npm run build
```

### Publish to NPM

```bash
cd multi-select-dropdown
npm login
npm publish
```

---

## 📄 License

MIT