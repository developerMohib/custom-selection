// import PropTypes from "prop-types";
// import "./App.css";
// import { useEffect, useMemo, useRef, useState } from "react";

// const defaultOptions = ["Java", "Go", "C", "C#", "C++", "Rust", "JavaScript", "Python"];

// const getOptionLabel = (option) => (typeof option === "string" ? option : option.label);
// const getOptionValue = (option) =>
//   typeof option === "string" ? option : option.value;
// const isGroup = (option) => option && Array.isArray(option.options);

// const CustomSelect = ({
//   isClearable = false,
//   isSearchable = false,
//   isDisabled = false,
//   isLoading = false,
//   options = defaultOptions,
//   value,
//   placeholder = "Select...",
//   isGrouped = false,
//   isMulti = false,
//   onChangeHandler,
//   onChange,
//   onMenuOpen,
//   onSearchHandler,
// }) => {
//   const containerRef = useRef(null);
//   const [clearable, setClearable] = useState(isClearable);
//   const [searchable, setSearchable] = useState(isSearchable);
//   const [disabled, setDisabled] = useState(isDisabled);
//   const [loading, setLoading] = useState(isLoading);
//   const [grouped, setGrouped] = useState(isGrouped);
//   const [multi, setMulti] = useState(isMulti);
//   const [selected, setSelected] = useState(() => value ?? (isMulti ? [] : null));
//   const [searchText, setSearchText] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     if (value !== undefined) setSelected(value);
//   }, [value]);

//   useEffect(() => {
//     setClearable(isClearable);
//     setSearchable(isSearchable);
//     setDisabled(isDisabled);
//     setLoading(isLoading);
//     setGrouped(isGrouped);
//     setMulti(isMulti);
//   }, [isClearable, isDisabled, isGrouped, isLoading, isMulti, isSearchable]);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (!containerRef.current?.contains(event.target)) setMenuOpen(false);
//     };
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, []);

//   const groups = useMemo(() => {
//     if (grouped) {
//       const optionGroups = options.filter(isGroup);
//       return optionGroups.length
//         ? optionGroups
//         : [{ label: "Languages", options: options.filter((option) => !isGroup(option)) }];
//     }
//     return [{ label: "", options: options.filter((option) => !isGroup(option)) }];
//   }, [grouped, options]);

//   const selectedValues = multi
//     ? Array.isArray(selected)
//       ? selected
//       : selected
//         ? [selected]
//         : []
//     : selected
//       ? [selected]
//       : [];
//   const filteredGroups = groups
//     .map((group) => ({
//       ...group,
//       options: group.options.filter((option) =>
//         getOptionLabel(option).toLowerCase().includes(searchText.toLowerCase())
//       ),
//     }))
//     .filter((group) => group.options.length > 0);

//   const emitChange = (nextValue) => {
//     setSelected(nextValue);
//     onChangeHandler?.(nextValue);
//     onChange?.(nextValue);
//   };

//   const openMenu = () => {
//     if (disabled || loading) return;
//     setMenuOpen(true);
//     onMenuOpen?.();
//   };

//   const handleSelect = (option) => {
//     if (option.isDisabled) return;
//     const optionValue = getOptionValue(option);
//     if (multi) {
//       const alreadySelected = selectedValues.some(
//         (item) => getOptionValue(item) === optionValue
//       );
//       emitChange(
//         alreadySelected
//           ? selectedValues.filter((item) => getOptionValue(item) !== optionValue)
//           : [...selectedValues, option]
//       );
//       setSearchText("");
//     } else {
//       emitChange(option);
//       setSearchText(getOptionLabel(option));
//       setMenuOpen(false);
//     }
//   };

//   const handleClear = () => {
//     emitChange(multi ? [] : null);
//     setSearchText("");
//   };

//   const handleSearch = (event) => {
//     const nextSearch = event.target.value;
//     setSearchText(nextSearch);
//     onSearchHandler?.(nextSearch);
//     setMenuOpen(true);
//   };

//   return (
//     <div className="kzui-demo">
//       <div className="kzui-select-div" ref={containerRef}>
//         <div className={`kzui-control ${disabled ? "is-disabled" : ""}`}>
//           <div className="kzui-value-container">
//             {multi && selectedValues.map((item) => (
//               <span className="kzui-chip" key={getOptionValue(item)}>
//                 {getOptionLabel(item)}
//                 <button type="button" onClick={() => handleSelect(item)} aria-label={`Remove ${getOptionLabel(item)}`}>
//                   x
//                 </button>
//               </span>
//             ))}
//             {searchable ? (
//               <input
//                 aria-label="Search options"
//                 type="search"
//                 disabled={disabled || loading}
//                 className="kzui-select-option"
//                 value={multi ? searchText : selected ? searchText : ""}
//                 placeholder={selected && !multi ? getOptionLabel(selected) : placeholder}
//                 onChange={handleSearch}
//                 onFocus={openMenu}
//               />
//             ) : (
//               <button type="button" className="kzui-select-button" disabled={disabled || loading} onClick={openMenu}>
//                 {loading ? "Loading..." : selectedValues.length ? selectedValues.map(getOptionLabel).join(", ") : placeholder}
//               </button>
//             )}
//           </div>
//           {clearable && selectedValues.length > 0 && (
//             <button type="button" className="kzui-select__clear" disabled={disabled} onClick={handleClear} aria-label="Clear selection">
//               x
//             </button>
//           )}
//           <span className="kzui-indicator" aria-hidden="true">{menuOpen ? "▲" : "▼"}</span>
//         </div>
//         {menuOpen && !loading && (
//           <div
//   className="kzui-language-sugges animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
//   role="listbox"
//   aria-multiselectable={multi || undefined}
// >
//             {filteredGroups.length === 0 ? (
//               <p className="kzui-empty">No options</p>
//             ) : filteredGroups.map((group) => (
//               <div key={group.label || "options"}>
//                 {group.label && <div className="kzui-group-label">{group.label}</div>}
//                 {group.options.map((option) => {
//                   const optionValue = getOptionValue(option);
//                   const isSelected = selectedValues.some((item) => getOptionValue(item) === optionValue);
//                   return (
//                     <button
//                       type="button"
//                       role="option"
//                       aria-selected={isSelected}
//                       disabled={option.isDisabled}
//                       className={`kzui-list-search ${isSelected ? "is-selected" : ""}`}
//                       onClick={() => handleSelect(option)}
//                       key={optionValue}
//                     >
//                       {multi && <span className="kzui-checkbox-mark" aria-hidden="true">{isSelected ? "[x]" : "[ ]"}</span>}
//                       {getOptionLabel(option)}
//                     </button>
//                   );
//                 })}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="kzui-checkbox" aria-label="Select options">
//         {["Clearable", "Searchable", "Disabled", "Loading", "Grouped", "Multi"].map((label) => (
//           <label className="kzui-cursor" key={label}>
//             <input
//               type="checkbox"
//               checked={{ Clearable: clearable, Searchable: searchable, Disabled: disabled, Loading: loading, Grouped: grouped, Multi: multi }[label]}
//               onChange={() => {
//                 const setters = { Clearable: setClearable, Searchable: setSearchable, Disabled: setDisabled, Loading: setLoading, Grouped: setGrouped, Multi: setMulti };
//                 setters[label]((currentValue) => !currentValue);
//               }}
//             />
//             <span>{label}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// CustomSelect.propTypes = {
//   isClearable: PropTypes.bool,
//   isSearchable: PropTypes.bool,
//   isDisabled: PropTypes.bool,
//   isLoading: PropTypes.bool,
//   options: PropTypes.array,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
//   placeholder: PropTypes.string,
//   isGrouped: PropTypes.bool,
//   isMulti: PropTypes.bool,
//   onChangeHandler: PropTypes.func,
//   onChange: PropTypes.func,
//   onMenuOpen: PropTypes.func,
//   onSearchHandler: PropTypes.func,
// };

// export default CustomSelect;
import { useState } from "react";
import CustomSelect from "./components/CustomSelect";

const groupedOptions = [
  { label: "Frontend", options: ["JavaScript", "TypeScript", "React"] },
  { label: "Backend", options: ["Java", "Go", "Python", "Rust"] },
  { label: "Systems", options: ["C", "C++", "C#"] },
];

export default function App() {
  const [opts, setOpts] = useState({
    clearable: true,
    searchable: true,
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