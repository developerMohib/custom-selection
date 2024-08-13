import PropTypes from "prop-types";
import "./App.css";
import { useEffect, useState } from "react";

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
  const [showOptions, setShowOptions] = useState(false);

  const handleClearable = (e) => {
    setClear(e.target.checked);
  };
  const filtered = options?.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (language) => {
    setSearchText(language);
    setShowOptions(false);
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);





  const handleClear = () => {
    setSelect(" ");
    setSearchText("");
  };

  console.log("group ", group);

  return (
    <>
      <div className="kzui-select-div">
        <div className="kzui-input-over">
          {searchable ? (
            <div>
              <input
                type="text"
                disabled={disabled}
                className="kzui-select-option"
                value={searchText}
                placeholder={placeholder}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setShowOptions(true);
                }}
                onClick={() => setShowOptions(true)}
              />
              {showOptions && filtered?.length > 0 && (
                <ul className="kzui-language-sugges">
                  {filtered?.map((language, index) => (
                    <li
                      className="kzui-list-search"
                      onClick={() => handleSelect(language)}
                      key={index}
                    >
                      {language}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <select
              className="kzui-select-option"
              value={select}
              disabled={disabled}
              onChange={(e) => setSelect(e.target.value)}
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
