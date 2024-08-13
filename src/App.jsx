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
  const [searchable, setSearchable] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [group, setGroup] = useState(false);

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const handleClearable = (e) => {
    setClear(e.target.checked);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    console.log('check ', e.target.value)
  };

  const handleClear = () => {
    setSelect(" ");
    setSearchText('')
  };

  console.log('group ', group)

  return (
    <>
      <div className="kzui-select-div">
        <div className="kzui-input-over">
          {searchable ? (
            <input
              type="text"
              disabled={disabled}
              className="kzui-select-option"
              value={searchText}
              placeholder={placeholder}
              onChange={handleSearch}
            />
          ) : (
            <select
              className="kzui-select-option"
              value={select}
              disabled={disabled}
              onChange={handleSelect}
            >
              {options.map((language, index) => (
                <option
                  key={index}
                  value={
                    language === "Pick your favorite language" ? " " : language
                  }
                >
                  {language === "Pick your favorite language"
                    ? placeholder
                    : language}
                </option>
              ))}
            </select>
          )}
        </div>
        {clear && (
          <button
            disabled={disabled}
            onClick={handleClear}
            className="kzui-select__clear kzui-select__control"
          >
            X
          </button>
        )}
      </div>
      <div className="kzui-checkbox">
        <label className="kzui-cursor">
          <input onClick={handleClearable} type="checkbox" />
          <span>Clearable</span>
        </label>
        <label className="kzui-cursor">
          <input
            onClick={(e) => setSearchable(e.target.checked)}
            type="checkbox"
          />
          <span>Searchable</span>
        </label>
        <label className="kzui-cursor">
          <input
            onClick={(e) => setDisabled(e.target.checked)}
            type="checkbox"
          />
          <span>Disabled</span>
        </label>
        <label className="kzui-cursor">
          <input onClick={(e) => setGroup(e.target.checked)} type="checkbox" />
          <span>Grouped</span>
        </label>
        <label className="kzui-cursor">
          <input onClick={onChangeHandler} type="checkbox" />
          <span>Multi</span>
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