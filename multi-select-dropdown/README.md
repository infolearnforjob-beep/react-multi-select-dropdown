# React Multi Select Dropdown

A customizable, searchable, lightweight React multi-select dropdown with async loading, checkbox support, keyboard navigation, and virtualization.

**NPM Package:** `@learnforjob/react-multi-select-dropdown`

## Installation

```bash
npm install @learnforjob/react-multi-select-dropdown
```

## Usage

```jsx
import React, { useState } from 'react';
import { MultiSelectDropdown } from '@learnforjob/react-multi-select-dropdown';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
];

function App() {
  const [selected, setSelected] = useState([]);

  return (
    <MultiSelectDropdown
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select frameworks"
    />
  );
}

export default App;
```

## Live Demo

Try it out in the **npm-dropdown-example** app:

```bash
cd npm-dropdown-example
npm install
npm start
```

Open `http://localhost:3000` to see all features in action.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | `Option[]` | `[]` | Array of `{label, value}` options to display |
| value | `(string \| number)[]` | `[]` | Currently selected values |
| onChange | `(values: (string \| number)[]) => void` | `undefined` | Callback when selection changes |
| placeholder | `string` | `'Select options'` | Placeholder text when nothing is selected |
| disabled | `boolean` | `false` | Disable the dropdown |
| selectAllText | `string` | `'Select All'` | Text for the "Select All" checkbox |
| searchable | `boolean` | `true` | Enable/disable the search input |
| groupBy | `string` | `undefined` | Property name to group options by |
| maxSelectionLimit | `number` | `undefined` | Maximum number of options that can be selected |
| renderOption | `(option: Option) => React.ReactNode` | `undefined` | Custom renderer for each option row |
| renderTag | `(option: Option) => React.ReactNode` | `undefined` | Custom renderer for selected tags in the header |
| customClassName | `string` | `undefined` | Additional CSS class added to the root container |
| theme | `Theme` | `undefined` | Theme object to customize colors, sizes, and borders |

### Theme Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| primaryColor | `string` | `'#339ef7'` | Primary accent color |
| primaryHover | `string` | `'#1a8ceb'` | Hover accent color |
| bgColor | `string` | `'#ffffff'` | Background color |
| borderColor | `string` | `'#cccccc'` | Border color |
| textColor | `string` | `'#333333'` | Text color |
| placeholderColor | `string` | `'#495057'` | Placeholder text color |
| itemHoverBg | `string` | `'#ebf5ff'` | Option hover background |
| selectedBg | `string` | `'#339ef7'` | Selected item background |
| selectedColor | `string` | `'#ffffff'` | Selected item text color |
| disabledBg | `string` | `'#e9ecef'` | Disabled background |
| disabledColor | `string` | `'#b3b3b3'` | Disabled text color |
| borderRadius | `string` | `'4px'` | Border radius |
| fontSize | `string` | `'1rem'` | Font size |
| headerHeight | `string` | `'36px'` | Header height |

## TypeScript Support

This package is written in TypeScript and includes type definitions — no extra `@types` package needed.

```tsx
import { MultiSelectDropdown, Theme } from '@learnforjob/react-multi-select-dropdown';

const myTheme: Theme = {
  primaryColor: '#ff6b6b',
  itemHoverBg: '#ffe0e0',
  borderRadius: '8px',
  headerHeight: '42px',
};

<MultiSelectDropdown theme={myTheme} ... />
```

## Customization

Customize rendering of options and selected tags:

```jsx
<MultiSelectDropdown
  options={options}
  value={selected}
  onChange={setSelected}
  renderOption={(option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>{option.label}</span>
      <small style={{ color: '#888' }}>{option.value}</small>
    </div>
  )}
  renderTag={(option) => (
    <span style={{ backgroundColor: 'lightblue', borderRadius: '12px', padding: '2px 8px' }}>
      {option.label}
    </span>
  )}
/>
```

## Grouped Options

Use the `groupBy` prop to visually group options by a shared property:

```jsx
const groupedOptions = [
  { label: 'React', value: 'react', category: 'Framework' },
  { label: 'Vue', value: 'vue', category: 'Framework' },
  { label: 'HTML', value: 'html', category: 'Language' },
  { label: 'CSS', value: 'css', category: 'Language' },
];

<MultiSelectDropdown
  options={groupedOptions}
  value={selected}
  onChange={setSelected}
  groupBy="category"
/>
```

## Accessibility

The component includes:
- Keyboard navigation (Arrow keys, Enter, Escape)
- Checkbox semantics with proper labeling

## Security

This package has been audited. Run `npm audit` in your project after installation for the latest vulnerability report.

## License

MIT