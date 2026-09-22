import { useState } from "react";
import CustomSelect from "./components/CustomSelect";

const groupedOptions = [
  { label: "Frontend", options: ["JavaScript", "TypeScript", "React"] },
  { label: "Backend", options: ["Java", "Go", "Python", "Rust"] },
  { label: "Systems", options: ["C", "C++", "C#"] },
];

export default function App() {
  const [opts, setOpts] = useState({
    clearable:true,
    searchable:false,
    disabled: false,
    grouped: false,
    multi: false,
  });
  const [value, setValue] = useState(null);

  return (
    <div style={{ padding: 40, background: "#f9fafb", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: 20, color: "#1f2937" }}>Custom Select Demo</h2>
      <CustomSelect
        options={opts.grouped ? groupedOptions : undefined}
        isClearable={opts.clearable}
        isSearchable={opts.searchable}
        isDisabled={opts.disabled}
        isGrouped={opts.grouped}
        isMulti={opts.multi}
        value={value}
        onChange={setValue}
        placeholder="Choose a language..."
      />
      <div style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
        {Object.entries(opts).map(([k, v]) => (
          <label key={k} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={v}
              onChange={() => setOpts((o) => ({ ...o, [k]: !o[k] }))}
            />
            <span style={{ textTransform: "capitalize" }}>{k}</span>
          </label>
        ))}
      </div>
      <pre style={{ marginTop: 24, background: "#fff", padding: 12, borderRadius: 8 }}>
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
}