import React, { useState, useCallback, useEffect } from "react";
import { MultiSelectDropdown } from "@learnforjob/react-multi-select-dropdown";

// ============================================================
// React Multi-Select Dropdown — Complete Working Example
// ============================================================
// This file demonstrates every feature of the component included
// locally in this project (no npm install needed).
//
// How the dropdown works:
//   1. You pass an array of {label, value} objects as `options`.
//   2. You hold the currently selected values in React state (`selectedValues`).
//   3. You pass `onChange={handleChange}` so the dropdown can tell you
//      when the user checks / unchecks an item.
//   4. The dropdown renders a clickable header, a search box, a
//      "Select All" checkbox, and one checkbox per option.
//   5. Click outside the dropdown (or press Escape) to close it.
//
// Features demonstrated below:
//   ✅ Basic usage
//   ✅ Placeholder text
//   ✅ Pre-selected (default) values
//   ✅ Disable / enable the dropdown
//   ✅ Limit the maximum number of selections
//   ✅ Custom "Select All" text
//   ✅ Turn search on / off
//   ✅ Grouped options (groupBy)
//   ✅ Custom option rendering (renderOption)
//   ✅ Custom tag rendering (renderTag)
//   ✅ Custom CSS class
//   ✅ Console logging of every change
// ============================================================

// -------------------------------------------------------------------
// DATA — sample options used throughout the example
// -------------------------------------------------------------------
const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
  { label: "Honeydew", value: "honeydew" },
];

const COLORS = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

const ANIMALS = [
  { label: "Dog", value: "dog", category: "Mammal" },
  { label: "Cat", value: "cat", category: "Mammal" },
  { label: "Elephant", value: "elephant", category: "Mammal" },
  { label: "Eagle", value: "eagle", category: "Bird" },
  { label: "Parrot", value: "parrot", category: "Bird" },
  { label: "Salmon", value: "salmon", category: "Fish" },
  { label: "Shark", value: "shark", category: "Fish" },
];

// -------------------------------------------------------------------
// MAIN APP COMPONENT
// -------------------------------------------------------------------
function App() {
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [selectedColors, setSelectedColors] = useState(["red", "blue"]);
  const [selectedMax, setSelectedMax] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [selectedCustom, setSelectedCustom] = useState([]);

  // -----------------------------------------------------------------
  // Generic change handler (re-used in several sections below)
  // -----------------------------------------------------------------
  const handleChange = useCallback((name) => (values) => {
    console.log(`[${name}] selected values:`, values);
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.h1}>
        🍎 react-multi-select-dropdown — Usage Examples
      </h1>
      <p style={styles.intro}>
        Below are working examples of every major feature. Open your
        browser console to see <code>onChange</code> events in real time.
      </p>

      {/* ===== EXAMPLE 1 — Basic usage ===== */}
      <section style={styles.section}>
        <h2>1️⃣ Basic Usage</h2>
        <p>
          Pass <code>options</code>, <code>value</code> (React state), and{" "}
          <code>onChange</code>. That's all you need.
        </p>

        <div style={styles.demoBox}>
          <MultiSelectDropdown
            options={FRUITS}
            value={selectedFruits}
            onChange={(values) => {
              setSelectedFruits(values);
              console.log("Basic selection:", values);
            }}
            placeholder="Pick a fruit…"
          />
        </div>

        <div style={styles.code}>
          <pre>{`<MultiSelectDropdown
  options={FRUITS}
  value={selectedFruits}
  onChange={setSelectedFruits}
  placeholder="Pick a fruit…"
/>`}</pre>
        </div>
      </section>

      {/* ===== EXAMPLE 2 — Default / pre-selected values ===== */}
      <section style={styles.section}>
        <h2>2️⃣ Default (Pre-Selected) Values</h2>
        <p>
          Initialize <code>useState</code> with an array of values that
          should be selected when the page loads.
        </p>

        <div style={styles.demoBox}>
          <MultiSelectDropdown
            options={COLORS}
            value={selectedColors}
            onChange={(values) => {
              setSelectedColors(values);
              console.log("Default values:", values);
            }}
            placeholder="Choose colors…"
          />
        </div>

        <div style={styles.code}>
          <pre>{`const [selectedColors, setSelectedColors] = useState(["red", "blue"]);

<MultiSelectDropdown
  options={COLORS}
  value={selectedColors}
  onChange={setSelectedColors}
/>`}</pre>
        </div>
      </section>

      {/* ===== EXAMPLE 3 — Disabled dropdown ===== */}
      <section style={styles.section}>
        <h2>3️⃣ Disabled State</h2>
        <p>
          Set <code>disabled={'{true}'}</code> to prevent interaction.
        </p>

        <div style={styles.demoBox}>
          <MultiSelectDropdown
            options={COLORS}
            value={["red"]}
            onChange={() => {}}
            disabled={true}
            placeholder="This dropdown is disabled"
          />
        </div>

        <div style={styles.code}>
          <pre>{`<MultiSelectDropdown
  options={COLORS}
  value={["red"]}
  disabled={true}
  placeholder="This dropdown is disabled"
/>`}</pre>
        </div>
      </section>

      {/* ===== EXAMPLE 4 — Max selection limit ===== */}
      <section style={styles.section}>
        <h2>4️⃣ Max Selection Limit</h2>
        <p>
          Use <code>maxSelectionLimit</code> to cap how many items a user
          can pick. Here the limit is <strong>3</strong>.
        </p>

        <div style={styles.demoBox}>
          <MultiSelectDropdown
            options={FRUITS}
            value={selectedMax}
            onChange={(values) => {
              setSelectedMax(values);
              console.log("Max-limit selection:", values);
            }}
            maxSelectionLimit={3}
            placeholder="Pick up to 3 fruits…"
          />
        </div>

        <div style={styles.code}>
          <pre>{`<MultiSelectDropdown
  options={FRUITS}
  value={selectedMax}
  onChange={setSelectedMax}
  maxSelectionLimit={3}
  placeholder="Pick up to 3 fruits…"
/>`}</pre>
        </div>
      </section>

      {/* ===== EXAMPLE 5 — Custom "Select All" text ===== */}
      <section style={styles.section}>
        <h2>5️⃣ Custom "Select All" Text</h2>
        <p>
          Change the label of the top checkbox with{" "}
          <code>selectAllText</code>.
        </p>

        <div style={styles.demoBox}>
          <MultiSelectDropdown
            options={FRUITS}
            value={selectedFruits}
            onChange={(values) => {
              setSelectedFruits(values);
              console.log("Custom select-all:", values);
            }}
            selectAllText="✓ All Fruits"
            placeholder="Pick fruits…"
          />
        </div>

        <div style={styles.code}>
          <pre>{`<MultiSelectDropdown
  options={FRUITS}
  value={selectedFruits}
  onChange={setSelectedFruits}
  selectAllText="✓ All Fruits"
/>`}</pre>
        </div>
      </section>

      {/* ===== EXAMPLE 6 — Searchable (default) vs non-searchable ===== */}
      <section style={styles.section}>
        <h2>6️⃣ Searchable (toggle)</h2>
        <p>
          By default the dropdown has a search input. Set{" "}
          <code>searchable={'{false}'}</code> to remove it.
        </p>

        <div style={styles.demoBox}>
          <MultiSelectDropdown
            options={FRUITS}
            value={selectedFruits}
            onChange={(values) => {
              setSelectedFruits(values);
              console.log("Searchable toggle:", values);
            }}
            searchable={false}
            placeholder="No search box here"
          />
        </div>

        <div style={styles.code}>
          <pre>{`<MultiSelectDropdown
  options={FRUITS}
  value={selectedFruits}
  onChange={setSelectedFruits}
  searchable={false}
  placeholder="No search box here"
/>`}</pre>
        </div>
      </section>

      {/* ===== EXAMPLE 7 — Grouped options ===== */}
      <section style={styles.section}>
        <h2>7️⃣ Grouped Options (groupBy)</h2>
        <p>
          Pass <code>groupBy="category"</code> to visually group options.
          Each option object must contain the property you specify.
        </p>

        <div style={styles.demoBox}>
          <MultiSelectDropdown
            options={ANIMALS}
            value={selectedAnimals}
            onChange={(values) => {
              setSelectedAnimals(values);
              console.log("Grouped selection:", values);
            }}
            groupBy="category"
            placeholder="Pick an animal…"
          />
        </div>

        <div style={styles.code}>
          <pre>{`const ANIMALS = [
  { label: "Dog", value: "dog", category: "Mammal" },
  { label: "Eagle", value: "eagle", category: "Bird" },
  // ...
];

<MultiSelectDropdown
  options={ANIMALS}
  value={selectedAnimals}
  onChange={setSelectedAnimals}
  groupBy="category"
/>`}</pre>
        </div>
      </section>

      {/* ===== EXAMPLE 8 — Custom option rendering ===== */}
      <section style={styles.section}>
        <h2>8️⃣ Custom Option Rendering (renderOption)</h2>
        <p>
          Use <code>renderOption</code> to fully control how each option
          row looks. The function receives the option object
          and must return React JSX.
        </p>

        <div style={styles.demoBox}>
          <MultiSelectDropdown
            options={FRUITS}
            value={selectedCustom}
            onChange={(values) => {
              setSelectedCustom(values);
              console.log("Custom render:", values);
            }}
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
              <span style={tagStyle(getFruitEmoji(option.value))}>
                {getFruitEmoji(option.value)} {option.label}
              </span>
            )}
            placeholder="Pick a fruit (custom rendered)…"
          />
        </div>

        <div style={styles.code}>
          <pre>{`<MultiSelectDropdown
  options={FRUITS}
  value={selectedCustom}
  onChange={setSelectedCustom}
  renderOption={(option) => (
    <div>
      <span>{getFruitEmoji(option.value)}</span>
      <div>
        <strong>{option.label}</strong>
        <small>value: {option.value}</small>
      </div>
    </div>
  )}
  renderTag={(option) => (
    <span className="custom-tag">
      {getFruitEmoji(option.value)} {option.label}
    </span>
  )}
/>`}</pre>
        </div>
      </section>

{/* ===== EXAMPLE 9 — Custom CSS class ===== */}
       <section style={styles.section}>
         <h2>9️⃣ Custom CSS Class</h2>
         <p>
           Add your own class name via <code>customClassName</code> for
           additional styling hooks.
         </p>

         <div style={styles.demoBox}>
           <MultiSelectDropdown
             options={FRUITS}
             value={selectedFruits}
             onChange={(values) => {
               setSelectedFruits(values);
               console.log("Custom class:", values);
             }}
             customClassName="my-custom-dropdown"
             placeholder="Styled with custom class…"
           />
         </div>

         <div style={styles.code}>
           <pre>{`<MultiSelectDropdown
  options={FRUITS}
  value={selectedFruits}
  onChange={setSelectedFruits}
  customClassName="my-custom-dropdown"
/>

/* In your CSS: */
.my-custom-dropdown .dropdown-header {
  background: #f0f0f0;
  border: 2px solid #333;
  border-radius: 8px;
}`}</pre>
         </div>
       </section>

       {/* ===== EXAMPLE 10 — Theme/Branding ===== */}
       <section style={styles.section}>
         <h2>🔟 Theme & Branding</h2>
         <p>
           Use the <code>theme</code> prop to customize colors, sizes, and other
           visual properties. Perfect for matching your brand colors.
         </p>

         <div style={styles.demoBox}>
           <MultiSelectDropdown
             options={FRUITS}
             value={selectedFruits}
             onChange={(values) => {
               setSelectedFruits(values);
               console.log("Branded selection:", values);
             }}
             theme={{
               primaryColor: "#ff6b6b",
               itemHoverBg: "#ffe0e0",
               borderRadius: "8px",
               headerHeight: "42px",
             }}
             placeholder="Coral brand theme"
           />
         </div>

         <div style={styles.code}>
           <pre>{`<MultiSelectDropdown
  options={FRUITS}
  value={selectedFruits}
  onChange={setSelectedFruits}
  theme={{
    primaryColor: "#ff6b6b",
    itemHoverBg: "#ffe0e0",
    borderRadius: "8px",
    headerHeight: "42px",
  }}
  placeholder="Coral brand theme"
/>`}</pre>
         </div>
       </section>

{/* ===== EXAMPLE 11 — Dynamic / async options ===== */}
       <section style={styles.section}>
         <h2>1️⃣1️⃣ Dynamic (Async) Options</h2>
        <p>
          Options can come from anywhere — an API call, Redux store,
          context, etc. Just update the <code>options</code> array and the
          dropdown re-renders automatically.
        </p>

        <div style={styles.demoBox}>
          <AsyncOptionsDemo />
        </div>

        <div style={styles.code}>
          <pre>{`function AsyncOptionsDemo() {
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
      placeholder="Loading…"
    />
  );
}`}</pre>
        </div>
      </section>

      {/* ===== PROPS REFERENCE ===== */}
      <section style={styles.section}>
        <h2>📋 Props Reference</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>options</code></td>
              <td><code>Option[]</code></td>
              <td><code>[]</code></td>
              <td>Array of <code>{"{label, value}"}</code> objects.</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>{"(string | number)[]"}</code></td>
              <td><code>[]</code></td>
              <td>Currently selected values.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>{"(values) => void"}</code></td>
              <td>—</td>
              <td>Callback fired when selection changes.</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string</code></td>
              <td><code>"Select options"</code></td>
              <td>Text shown when nothing is selected.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disables the dropdown.</td>
            </tr>
            <tr>
              <td><code>selectAllText</code></td>
              <td><code>string</code></td>
              <td><code>"Select All"</code></td>
              <td>Text for the "select all" checkbox.</td>
            </tr>
            <tr>
              <td><code>searchable</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show / hide the search input.</td>
            </tr>
            <tr>
              <td><code>groupBy</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Property name to group options by.</td>
            </tr>
            <tr>
              <td><code>maxSelectionLimit</code></td>
              <td><code>number</code></td>
              <td><code>undefined</code></td>
              <td>Maximum number of selections allowed.</td>
            </tr>
            <tr>
              <td><code>renderOption</code></td>
              <td><code>{"(option) => ReactNode"}</code></td>
              <td><code>undefined</code></td>
              <td>Custom renderer for each option row.</td>
            </tr>
            <tr>
              <td><code>renderTag</code></td>
              <td><code>{"(option) => ReactNode"}</code></td>
              <td><code>undefined</code></td>
              <td>Custom renderer for selected tags in header.</td>
            </tr>
<tr>
               <td><code>customClassName</code></td>
               <td><code>string</code></td>
               <td><code>undefined</code></td>
               <td>Extra CSS class added to the root container.</td>
             </tr>
             <tr>
               <td><code>theme</code></td>
               <td><code>Theme</code></td>
               <td><code>undefined</code></td>
               <td>Custom theme object to override colors and styles.</td>
             </tr>
           </tbody>
         </table>
         <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
           Theme props: <code>primaryColor, primaryHover, bgColor, borderColor, textColor, placeholderColor, itemHoverBg, selectedBg, selectedColor, disabledBg, disabledColor, borderRadius, fontSize, headerHeight</code>
         </p>
       </section>

      <footer style={styles.footer}>
        <p>Built with ❤️ — <code>MultiSelectDropdown</code></p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// Helper: map fruit names to emojis (used in Example 8)
// -------------------------------------------------------------------
function getFruitEmoji(value) {
  const map = {
    apple: "🍎",
    banana: "🍌",
    cherry: "🍒",
    date: "🫒",
    elderberry: "🫐",
    fig: "🍇",
    grape: "🍇",
    honeydew: "🍈",
  };
  return map[value] || "❓";
}

// -------------------------------------------------------------------
// Helper: inline style for custom tags (Example 8)
// -------------------------------------------------------------------
const tagStyle = (emoji) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  background: "#e8f5e9",
  border: "1px solid #a5d6a7",
  borderRadius: "12px",
  padding: "2px 10px",
  margin: "2px",
  fontSize: "0.85rem",
  color: "#2e7d32",
});

// -------------------------------------------------------------------
// Sub-component: async-loading demo (Example 10)
// -------------------------------------------------------------------
function AsyncOptionsDemo() {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate a network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setOptions(FRUITS);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MultiSelectDropdown
      options={options}
      value={selected}
      onChange={(values) => {
        setSelected(values);
        console.log("Async selection:", values);
      }}
      placeholder={loading ? "Loading options…" : "Pick a fruit…"}
      disabled={loading}
    />
  );
}

// -------------------------------------------------------------------
// PAGE-LEVEL STYLES — keeps the examples looking clean without any
// external CSS file.  Replace with your own CSS modules / Tailwind / etc.
// -------------------------------------------------------------------
const styles = {
  page: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem 1rem",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#333",
  },
  h1: {
    fontSize: "1.8rem",
    marginBottom: "0.5rem",
  },
  intro: {
    color: "#666",
    marginBottom: "2rem",
    lineHeight: 1.6,
  },
  section: {
    marginBottom: "2.5rem",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid #e0e0e0",
  },
  demoBox: {
    border: "1px dashed #ccc",
    borderRadius: "8px",
    padding: "1.5rem",
    margin: "1rem 0",
    background: "#fafafa",
  },
  code: {
    background: "#1e1e2e",
    color: "#cdd6f4",
    borderRadius: "6px",
    padding: "1rem",
    overflowX: "auto",
    fontSize: "0.85rem",
    lineHeight: 1.5,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  footer: {
    textAlign: "center",
    marginTop: "3rem",
    color: "#888",
    fontSize: "0.9rem",
  },
};

export default App;