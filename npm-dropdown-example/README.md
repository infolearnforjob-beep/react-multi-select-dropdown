# 🍎 react-multi-select-dropdown — Complete Example

> A fully-working React example showing how to use every feature of the
> **react-multi-select-dropdown** package.

---

## Quick Start (30 seconds)

```bash
# 1. Clone or copy this folder
cd npm-dropdown-example

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

Open `http://localhost:3000` — you'll see all the examples below running
interactively.

---

## How the Dropdown Works

Think of the dropdown as a **controlled React component**:

1. **You** own the data — an array of `{ label, value }` objects called
   `options`, and an array of currently-chosen values called `value`.
2. You pass three required props — `options`, `value`, and `onChange`.
3. Whenever the user checks or unchecks a box, the component calls your
   `onChange(newValuesArray)` so you can update your state.

That's it. Everything else is optional.

```jsx
import MultiSelectDropdown from "@learnforjob/react-multi-select-dropdown";

function App() {
  const [selected, setSelected] = useState([]);

  const options = [
    { label: "React",  value: "react"  },
    { label: "Vue",    value: "vue"    },
    { label: "Angular", value: "angular" },
  ];

  return (
    <MultiSelectDropdown
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Pick a framework"
    />
  );
}
```

---

## File Structure

```
npm-dropdown-example/
├── package.json           # Dependencies & scripts
├── public/
│   └── index.html         # HTML shell (mounts <div id="root">)
└── src/
    ├── index.js            # Entry point — renders <App />
    └── App.js              # All usage examples in one file
```

---

## All Examples Explained

### 1️⃣ Basic Usage

The minimum you need — pass `options`, `value`, `onChange`, and a
`placeholder`:

```jsx
const [selectedFruits, setSelectedFruits] = useState([]);

<MultiSelectDropdown
  options={FRUITS}
  value={selectedFruits}
  onChange={setSelectedFruits}
  placeholder="Pick a fruit…"
/>
```

**What happens:**
- User clicks the dropdown header → list opens.
- User types in the search box → options filter instantly.
- User checks a checkbox → `setSelectedFruits` is called with an array
  like `["apple", "grape"]`.
- User clicks outside → dropdown closes.

---

### 2️⃣ Default (Pre-Selected) Values

Initialize your state with values that should already be selected:

```jsx
const [selectedColors, setSelectedColors] = useState(["red", "blue"]);

<MultiSelectDropdown
  options={COLORS}
  value={selectedColors}
  onChange={setSelectedColors}
/>
```

When the dropdown opens, "Red" and "Blue" will already be checked.

---

### 3️⃣ Disabled State

Pass `disabled={true}` to gray out the dropdown and block all interaction:

```jsx
<MultiSelectDropdown
  options={COLORS}
  value={["red"]}
  disabled={true}
  placeholder="This dropdown is disabled"
/>
```

**Use case:** Show data in read-only mode, or disable while a form is
submitting.

---

### 4️⃣ Max Selection Limit

Prevent users from selecting more than *N* items:

```jsx
const [selectedMax, setSelectedMax] = useState([]);

<MultiSelectDropdown
  options={FRUITS}
  value={selectedMax}
  onChange={setSelectedMax}
  maxSelectionLimit={3}
  placeholder="Pick up to 3 fruits…"
/>
```

When 3 items are selected, remaining checkboxes become unclickable.

---

### 5️⃣ Custom "Select All" Text

Change the default `"Select All"` label to anything you want:

```jsx
<MultiSelectDropdown
  options={FRUITS}
  value={selectedFruits}
  onChange={setSelectedFruits}
  selectAllText="✓ All Fruits"
/>
```

---

### 6️⃣ Toggle Search Bar

The search box is **on by default**. Turn it off when it's not needed:

```jsx
<MultiSelectDropdown
  options={FRUITS}
  value={selectedFruits}
  onChange={setSelectedFruits}
  searchable={false}
  placeholder="No search box here"
/>
```

---

### 7️⃣ Grouped Options (`groupBy`)

If your option objects have a category field, pass its name to `groupBy`:

```jsx
const ANIMALS = [
  { label: "Dog",     value: "dog",     category: "Mammal" },
  { label: "Cat",     value: "cat",     category: "Mammal" },
  { label: "Eagle",   value: "eagle",   category: "Bird"   },
  { label: "Salmon",  value: "salmon",  category: "Fish"   },
];

<MultiSelectDropdown
  options={ANIMALS}
  value={selectedAnimals}
  onChange={setSelectedAnimals}
  groupBy="category"
/>
```

The dropdown will render collapsible group headers: **Mammal**, **Bird**,
**Fish**.

---

### 8️⃣ Custom Option & Tag Rendering

Two powerful props let you override the default HTML:

- **`renderOption(option)`** — controls how each row in the dropdown looks.
- **`renderTag(option)`** — controls how each selected value appears in the
  header bar.

```jsx
<MultiSelectDropdown
  options={FRUITS}
  value={selectedCustom}
  onChange={setSelectedCustom}
  renderOption={(option) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "1.4rem" }}>
        {getFruitEmoji(option.value)}
      </span>
      <div>
        <div style={{ fontWeight: "bold" }}>{option.label}</div>
        <small style={{ color: "#888" }}>value: {option.value}</small>
      </div>
    </div>
  )}
  renderTag={(option) => (
    <span className="custom-tag">
      {getFruitEmoji(option.value)} {option.label}
    </span>
  )}
/>
```

**Use cases:** Show avatars next to names, render colored badges, add
icons, display extra metadata, etc.

---

### 9️⃣ Custom CSS Class

Add your own class for additional styling without fighting the default
styles:

```jsx
<MultiSelectDropdown
  options={FRUITS}
  value={selectedFruits}
  onChange={setSelectedFruits}
  customClassName="my-custom-dropdown"
/>
```

```css
/* Your own stylesheet */
.my-custom-dropdown .dropdown-header {
  background: #f0f0f0;
  border: 2px solid #333;
  border-radius: 8px;
}
```

---

### 🔟 Dynamic (Async) Options

Options can come from an API, Redux store, React Context, etc. The
component re-renders automatically whenever `options` or `value` change:

```jsx
function AsyncDemo() {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch("/api/options")
      .then((r) => r.json())
      .then((data) => setOptions(data));
  }, []);

  return (
    <MultiSelectDropdown
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder={options.length === 0 ? "Loading…" : "Pick one…"}
      disabled={options.length === 0}
    />
  );
}
```

---

## Complete Props Reference

| Prop                | Type                        | Default           | Description                                    |
|---------------------|-----------------------------|-------------------|------------------------------------------------|
| `options`           | `Option[]`                  | `[]`              | Array of `{label, value}` objects.             |
| `value`             | `(string \| number)[]`     | `[]`              | Currently selected values.                     |
| `onChange`          | `(values: (string \| number)[]) => void` | — | Callback fired on every selection change.     |
| `placeholder`       | `string`                    | `"Select options"`| Text when nothing is selected.                 |
| `disabled`          | `boolean`                   | `false`           | Gray out and block interaction.                |
| `selectAllText`     | `string`                    | `"Select All"`    | Label for the "select all" checkbox.           |
| `searchable`        | `boolean`                   | `true`            | Show / hide the search input.                  |
| `groupBy`           | `string`                    | `undefined`       | Property name to group options by.             |
| `maxSelectionLimit` | `number`                   | `undefined`       | Maximum number of selectable items.            |
| `renderOption`      | `(option: Option) => ReactNode` | `undefined` | Custom renderer for each option row.           |
| `renderTag`         | `(option: Option) => ReactNode` | `undefined` | Custom renderer for selected tags in header.   |
| `customClassName`   | `string`                    | `undefined`       | Extra CSS class on the root container.         |

---

## TypeScript Support

The package ships type definitions out of the box. Import the `Option` and
`MultiSelectDropdownProps` types directly:

```tsx
import MultiSelectDropdown, { Option, MultiSelectDropdownProps }
  from "react-multi-select-dropdown";

const options: Option[] = [
  { label: "React", value: "react" },
  { label: "Vue",   value: "vue"   },
];
```

---

## Accessibility

- **Keyboard navigation** — Arrow keys move focus, Enter toggles
  selection, Escape closes the dropdown.
- **ARIA attributes** — `role="listbox"`, `aria-checked`, and proper
  `label`/`id` wiring.
- **Screen-reader friendly** — Selected count and labels are announced.

---

## Under the Hood

| Concern              | Implementation                              |
|----------------------|---------------------------------------------|
| Toggle open/close    | `useState` on `isOpen` + header click      |
| Outside click close  | Global `mousedown` listener, cleanup on unmount |
| Search filtering     | Case-insensitive `String.includes()` on `label` |
| Select All           | Checks *all* options (not just filtered)    |
| Max limit            | Early return in `handleCheckboxChange`      |
| Grouping             | `useMemo` builds a map from `groupBy` prop  |
| Styles               | Scoped SCSS (no global leakage)             |
| Build                | Rollup → CJS + ESM + `.d.ts` declarations   |

---

## License

MIT — feel free to use this in any project.