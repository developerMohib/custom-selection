import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./CustomSelect.css";

const defaultOptions = [
    "Java", "Go", "C", "C#", "C++", "Rust", "JavaScript", "Python",
];

const getOptionLabel = (o) => (typeof o === "string" ? o : o?.label ?? "");
const getOptionValue = (o) => (typeof o === "string" ? o : o?.value ?? o?.label ?? "");
const isGroup = (o) => o && Array.isArray(o.options);
const areEqual = (a, b) => getOptionValue(a) === getOptionValue(b);

const CustomSelect = ({
    isClearable = false,
    isSearchable = false,
    isDisabled = false,
    isLoading: isLoadingProp = false,
    options = defaultOptions,
    value,
    placeholder = "Select...",
    isGrouped = false,
    isMulti = false,
    onChange,
    onMenuOpen,
    onMenuClose,
    onSearch,
    loadingMessage = "Loading...",
    noOptionsMessage = "No options",
    asyncDelay = 400,
}) => {
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const debounceRef = useRef(null);

    const closeMenuRef = useRef(() => { });

    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(() =>
        isMulti ? (Array.isArray(value) ? value : []) : (value ?? null)
    );
    const selected = isControlled ? value : internalValue;

    const selectedValues = useMemo(() => {
        if (isMulti) return Array.isArray(selected) ? selected : selected ? [selected] : [];
        return selected ? [selected] : [];
    }, [selected, isMulti]);


    useEffect(() => {
        if (isOpen) return;
        if (!isMulti && selected) {
            setSearchText(getOptionLabel(selected)); selected
        } else {
            setSearchText("");
        }
    }, [isOpen, isSearchable, isMulti, selected]);

    const groups = useMemo(() => {
        const flat = options.filter((o) => !isGroup(o));
        if (isGrouped) {
            const grouped = options.filter(isGroup);
            if (grouped.length) return grouped;
            return [{ label: "Languages", options: flat }];
        }
        return [{ label: "", options: flat }];
    }, [options, isGrouped]);

    const filteredGroups = useMemo(() => {
        const q = searchText.trim().toLowerCase();
        return groups
            .map((g) => ({
                ...g,
                options: g.options.filter((o) => getOptionLabel(o).toLowerCase().includes(q)),
            }))
            .filter((g) => g.options.length > 0);
    }, [groups, searchText]);

    const flatOptions = useMemo(
        () => filteredGroups.flatMap((g) => g.options),
        [filteredGroups]
    );

    const isLoading = isLoadingProp || isSearching;

    const emitChange = useCallback(
        (next) => {
            if (!isControlled) setInternalValue(next);
            onChange?.(next);
        },
        [isControlled, onChange]
    );

    const openMenu = useCallback(() => {
        if (isDisabled) return;
        setIsOpen(true);
        setActiveIndex(-1);
        onMenuOpen?.();
        if (isSearchable) setTimeout(() => inputRef.current?.focus(), 0);
    }, [isDisabled, onMenuOpen, isSearchable]);

    const closeMenu = useCallback(() => {
        setIsOpen((prev) => {
            if (!prev) return prev;
            return false;
        });
        setActiveIndex(-1);
        onMenuClose?.();
    }, [onMenuClose]);

    useEffect(() => {
        closeMenuRef.current = closeMenu;
    }, [closeMenu]);

    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                closeMenuRef.current();
            }
        };
        document.addEventListener("mousedown", handler, true);
        return () => document.removeEventListener("mousedown", handler, true);
    }, []);

    const toggleMenu = () => (isOpen ? closeMenu() : openMenu());

    const handleSearch = (e) => {
        const next = e.target.value;
        setSearchText(next);
        onSearch?.(next);
        if (!isOpen) setIsOpen(true);

        if (next.trim()) {
            setIsSearching(true);
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => setIsSearching(false), asyncDelay);
        } else {
            setIsSearching(false);
            clearTimeout(debounceRef.current);
        }
    };

    const handleSelect = (option) => {
        if (option?.isDisabled) return;
        if (isMulti) {
            const already = selectedValues.some((s) => areEqual(s, option));
            emitChange(already ? selectedValues.filter((s) => !areEqual(s, option)) : [...selectedValues, option]);
            setSearchText("");
            inputRef.current?.focus();
        } else {
            emitChange(option);
            closeMenu();
        }
    };

    const handleRemoveChip = (option, e) => {
        e.stopPropagation();
        if (isDisabled) return;
        emitChange(selectedValues.filter((s) => !areEqual(s, option)));
    };

    const handleClear = (e) => {
        e.stopPropagation();
        if (isDisabled) return;
        emitChange(isMulti ? [] : null);
        setSearchText("");
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (isDisabled) return;
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                if (!isOpen) openMenu();
                else setActiveIndex((i) => Math.min(i + 1, flatOptions.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                if (isOpen) setActiveIndex((i) => Math.max(i - 1, 0));
                break;
            case "Enter":
                e.preventDefault();
                if (isOpen && activeIndex >= 0 && flatOptions[activeIndex]) {
                    handleSelect(flatOptions[activeIndex]);
                } else if (!isOpen) openMenu();
                break;
            case "Escape":
                e.preventDefault();
                closeMenu();
                break;
            case "Home":
                if (isOpen) { e.preventDefault(); setActiveIndex(0); }
                break;
            case "End":
                if (isOpen) { e.preventDefault(); setActiveIndex(flatOptions.length - 1); }
                break;
            case "Backspace":
                if (isMulti && !searchText && selectedValues.length) {
                    emitChange(selectedValues.slice(0, -1));
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (activeIndex >= 0 && listRef.current) {
            const el = listRef.current.querySelector(`[data-option-index="${activeIndex}"]`);
            el?.scrollIntoView({ block: "nearest" });
        }
    }, [activeIndex]);

    const hasValue = selectedValues.length > 0;
    const displayText = !isSearchable && !isMulti && selected ? getOptionLabel(selected) : "";
    console.log("displayText", displayText, "searchText", searchText, "selectedValues", selectedValues);
    return (
        <div className="kzui-select" ref={containerRef} onKeyDown={handleKeyDown}>
            <div
                className={`kzui-control ${isDisabled ? "is-disabled" : ""} ${isOpen ? "is-open" : ""}`}
                onClick={isSearchable ? undefined : toggleMenu}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-disabled={isDisabled}
            >
                <div className="kzui-value-container">
                    {isMulti && selectedValues.map((item) => (
                        <span className="kzui-chip" key={getOptionValue(item)}>
                            <span className="kzui-chip-label">{getOptionLabel(item)}</span>
                            <button
                                type="button"
                                className="kzui-chip-remove"
                                onClick={(e) => handleRemoveChip(item, e)}
                                aria-label={`Remove ${getOptionLabel(item)}`}
                                tabIndex={-1}
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                                    <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        </span>
                    ))}

                    {isSearchable ? (
                        <input
                            ref={inputRef}
                            type="text"
                            className="kzui-input"
                            value={searchText}
                            placeholder={hasValue && !isMulti ? "" : placeholder}
                            disabled={isDisabled}
                            onChange={handleSearch}
                            onFocus={openMenu}
                            aria-autocomplete="list"
                            aria-controls="kzui-listbox"
                            aria-activedescendant={activeIndex >= 0 ? `kzui-opt-${activeIndex}` : undefined}
                        />
                    ) : (
                        <span className="kzui-single-value" onClick={toggleMenu}>
                            {displayText || <span className="kzui-placeholder">{placeholder}</span>}
                        </span>
                    )}
                </div>

                <div className="kzui-indicators">
                    {isLoading && (
                        <span className="kzui-indicator kzui-spinner" aria-label="Loading">
                            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                                <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" />
                            </svg>
                        </span>
                    )}
                    {isClearable && hasValue && !isDisabled && (
                        <button
                            type="button"
                            className="kzui-indicator kzui-clear"
                            onClick={handleClear}
                            aria-label="Clear selection"
                            tabIndex={-1}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                                <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </button>
                    )}
                    <span className="kzui-indicator kzui-chevron" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                            <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="kzui-menu" role="listbox" id="kzui-listbox" aria-multiselectable={isMulti || undefined}>
                    {isLoading && !flatOptions.length ? (
                        <div className="kzui-state">{loadingMessage}</div>
                    ) : flatOptions.length === 0 ? (
                        <div className="kzui-state">{noOptionsMessage}</div>
                    ) : (
                        <div className="kzui-options" ref={listRef}>
                            {filteredGroups.map((group, gi) => (
                                <div key={group.label || gi} className="kzui-group">
                                    {group.label && <div className="kzui-group-label">{group.label}</div>}
                                    {group.options.map((option) => {
                                        const optValue = getOptionValue(option);
                                        const isSelected = selectedValues.some((s) => areEqual(s, option));
                                        const idx = flatOptions.indexOf(option);
                                        const isActive = idx === activeIndex;
                                        return (
                                            <div
                                                key={optValue}
                                                id={`kzui-opt-${idx}`}
                                                data-option-index={idx}
                                                role="option"
                                                aria-selected={isSelected}
                                                aria-disabled={option.isDisabled || undefined}
                                                className={`kzui-option ${isSelected ? "is-selected" : ""} ${isActive ? "is-focused" : ""} ${option.isDisabled ? "is-disabled" : ""}`}
                                                onClick={() => handleSelect(option)}
                                                onMouseEnter={() => setActiveIndex(idx)}
                                            >
                                                {isMulti && (
                                                    <span className={`kzui-checkbox ${isSelected ? "is-checked" : ""}`} aria-hidden="true">
                                                        {isSelected && (
                                                            <svg width="10" height="10" viewBox="0 0 10 10">
                                                                <path d="M2 5L4.5 7.5L8 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                )}
                                                <span className="kzui-option-label">{getOptionLabel(option)}</span>
                                                {!isMulti && isSelected && (
                                                    <svg className="kzui-check-icon" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                                                        <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

CustomSelect.propTypes = {
    isClearable: PropTypes.bool,
    isSearchable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
    placeholder: PropTypes.string,
    isGrouped: PropTypes.bool,
    isMulti: PropTypes.bool,
    onChange: PropTypes.func,
    onMenuOpen: PropTypes.func,
    onMenuClose: PropTypes.func,
    onSearch: PropTypes.func,
    loadingMessage: PropTypes.string,
    noOptionsMessage: PropTypes.string,
    asyncDelay: PropTypes.number,
};

export default CustomSelect;