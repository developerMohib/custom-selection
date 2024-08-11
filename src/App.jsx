import PropTypes from "prop-types";
import "./App.css";
import { useState } from "react";

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder = "Search...",
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
    "Python",
  ];
  const [select, setSelect] = useState("");
  const [clear, setClear] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [searchable, setSearchable] = useState(false);
  const [searchText, setSearchText] = useState('');


  onChangeHandler = () => {
    console.log("handler");
    setSearchable(true)
  };
  const handleSelect =(e)=>{
    setSelect(e.target.value)
  }
  const handleClearable = (e) => {
    setClear(e.target.checked);
  };
  
  const handleClear = () => {
    console.log("clear koro");
  };
  const handleDisabled = (e) => {
    setDisabled(e.target.checked);
  };

  return (
    <>
      <div className="kzui-select-div">
        <select
          disabled={disabled}
          onChange={handleSelect}
          className="kzui-select-option"
        >
          {options.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
        {clear && (
          <button
            disabled={disabled}
            onClick={handleClear}
            className="kzui-select__clear"
          >
            X
          </button>
        )}
      </div>
      {/* Is searchable */}
      <div>
        
          {searchable && (
            <input
              type="text"
              className="kzui-select__search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
        
      </div>

      {/* Here these check box for making command */}

      <div className="kzui-checkbox">
        <label className="kzui-cursor">
          <input onClick={handleClearable} type="checkbox" />
          <span className="">Clearable</span>
        </label>
        <label className="kzui-cursor">
          <input onClick={onChangeHandler} type="checkbox" className="" />
          <span className="">Searchable</span>
        </label>
        <label className="kzui-cursor">
          <input onClick={handleDisabled} type="checkbox" className="" />
          <span className="">Disabled</span>
        </label>
        <label className="kzui-cursor">
          <input onClick={onChangeHandler} type="checkbox" className="" />
          <span className="">Grouped</span>
        </label>
        <label className="kzui-cursor">
          <input onClick={onChangeHandler} type="checkbox" className="" />
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
