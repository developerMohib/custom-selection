import PropTypes from "prop-types";
import "./App.css";
import { useEffect, useState } from "react";

const CustomSelect = ({
  isClearable,
  isSearchable = false,
  isDisabled,
  options,
  value,
  placeholder = "select",
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const defaultOptions = [
    "Java",
    "Go",
    "C",
    "C#",
    "C++",
    "Rust",
    "JavaScript",
    "Python",
  ];
  const finalOptions = options?.length ? options : defaultOptions;


  const [select, setSelect] = useState("");
  const [searchText, setSearchText] = useState("");

  const [clear, setClear] = useState(isClearable ?? false);
  const [searchable, setSearchable] = useState(isSearchable ?? false);
  const [disabled, setDisabled] = useState(isDisabled ?? false);
  const [group, setGroup] = useState(isGrouped ?? false);
  const [multi, setMulti] = useState(isMulti ?? false);


  const [showOptions, setShowOptions] = useState(false);

  const handleClearable = (e) => {
    setClear(e.target.checked);
  };
  const filtered = finalOptions?.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (language) => {
    setSearchText(language);
    setSelect(language)
    console.log('select language', language)
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

  console.log("select ", select);
  console.log("searchable ", searchable);
  console.log("searchText ", searchText);
  console.log('select language', select)
  return (
    <>
      <div className="kzui-select-div">
        <div className="kzui-input-over">
          {searchable ? (
            <div>
              <input
                type="text"
                name="search"
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
                  {filtered.map((language) => (
                    <li
                      key={language} // assuming language is unique
                      className="kzui-list-search"
                      onClick={() => handleSelect(language)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSelect(language);
                        }
                      }}
                    >
                      {language} helloe
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <select
              name="select"
              className="kzui-select-option"
              value={select}
              disabled={disabled}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="" disabled>
                {placeholder}
              </option>

              {defaultOptions.map((language, index) => (
                <option key={index} value={language}>
                  {language}
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
          <input name="clearable" onClick={handleClearable} type="checkbox" />
          <span>Clearable</span>
        </label>
        <label className="kzui-cursor">
          <input name=""
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
