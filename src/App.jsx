import PropTypes from "prop-types";
import "./App.css";
import { useState } from "react";

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  options = [
    "Pick your favorite language",
    "Java",
    "Go",
    "C",
    "C#",
    "C++",
    "Rust",
    "JavaScript",
    "Python"
  ];
  const [select, setSelect] = useState("");
  console.log("select", select);

  return (
    <>
      <select
    onChange={(e) => setSelect(e.target.value)}
    className="kzui-select-option"
  >
    {options.map((language, index) => (
      <option key={index} value={language}>
        {language}
      </option>
    ))}
  </select>

      <div className="kzui-checkbox">
        <label className="kzui-cursor">
          <input type="checkbox" className="" />
          <span className="">Clearable</span>
        </label>
        <label className="kzui-cursor">
          <input type="checkbox" className="" />
          <span className="">Searchable</span>
        </label>
        <label className="kzui-cursor">
          <input type="checkbox" className="" />
          <span className="">Disabled</span>
        </label>
        <label className="kzui-cursor">
          <input type="checkbox" className="" />
          <span className="">Grouped</span>
        </label>
        <label className="kzui-cursor">
          <input type="checkbox" className="" />
          <span className="">Multi</span>
        </label>
      </div>
    </>
  );
};
CustomSelect.propTypes = {
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isGrouped: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChangeHandler: PropTypes.func,
  onMenuOpen: PropTypes.func,
  onSearchHandler: PropTypes.func,
};

export default CustomSelect;
