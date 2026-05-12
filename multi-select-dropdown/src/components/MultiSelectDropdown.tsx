import React, { useState, useRef, useEffect, useMemo } from "react";
import "../styles/multiSelectDropdown.scss";

export interface Option {
  label: string;
  value: string | number;
}

export interface Theme {
  primaryColor?: string;
  primaryHover?: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  placeholderColor?: string;
  itemHoverBg?: string;
  selectedBg?: string;
  selectedColor?: string;
  disabledBg?: string;
  disabledColor?: string;
  borderRadius?: string;
  fontSize?: string;
  headerHeight?: string;
}

export interface MultiSelectDropdownProps {
  options: Option[];
  value: (string | number)[];
  onChange: (values: (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
  selectAllText?: string;
  searchable?: boolean;
  groupBy?: string;
  maxSelectionLimit?: number;
  renderOption?: (option: Option) => React.ReactNode;
  renderTag?: (option: Option) => React.ReactNode;
  customClassName?: string;
  theme?: Theme;
}

const MultiSelectDropdown = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options",
  disabled = false,
  selectAllText = "Select All",
  searchable = true,
  groupBy,
  maxSelectionLimit,
  renderOption,
  renderTag: _renderTag,
  customClassName,
  theme,
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Process options for grouping
  const processedOptions = useMemo(() => {
    if (!groupBy) return options;
    
    // Group options by the specified property
    const groups: { label: string; options: Option[] }[] = [];
    const groupMap = new Map<string, Option[]>();
    
    options.forEach(option => {
      const groupKey = String((option as any)[groupBy] || "Other");
      if (!groupMap.has(groupKey)) {
        groupMap.set(groupKey, []);
      }
      groupMap.get(groupKey)!.push(option);
    });
    
    groupMap.forEach((opts, label) => {
      groups.push({ label, options: opts } as any);
    });
    
    return groups;
  }, [options, groupBy]);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm) {
      return groupBy ? (processedOptions as any) : options;
    }
    
    const searchableOptions = options.filter((option) => {
      const label = String(option?.label || "");
      return label.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    if (groupBy) {
      return (processedOptions as any[])
        .map(group => ({
          ...group,
          options: group.options.filter((option: Option) =>
            searchableOptions.some(opt => opt.value === option.value)
          )
        }))
        .filter(group => group.options.length > 0);
    }
    return searchableOptions;
  }, [options, searchTerm, searchable, groupBy, processedOptions]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  };

  // Select / Unselect single item
  const handleCheckboxChange = (val: string | number) => {
    // Check max selection limit
    if (!value.includes(val) && maxSelectionLimit && value.length >= maxSelectionLimit) {
      return;
    }

    let updated: (string | number)[] = [];
    if (value.includes(val)) {
      updated = value.filter(v => v !== val);
    } else {
      updated = [...value, val];
    }

    onChange && onChange(updated);
  };

  // FIXED: Select All (select ALL options, not filtered)
  const handleSelectAll = () => {
    const allValues = options.map(opt => opt.value);
    const isAllSelected = allValues.every(v => value.includes(v));

    let updated: (string | number)[] = [];
    if (isAllSelected) {
      updated = [];
    } else {
      updated = allValues;
    }

    onChange && onChange(updated);
  };

  // Check if ALL options selected
  const isAllSelected =
    options.length > 0 &&
    options.every(opt => value.includes(opt.value));

  // Labels for display
  const selectedLabels = options
    .filter(opt => value.includes(opt.value))
    .map(opt => opt.label);

  // Close on outside click (mousedown fix)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  return (
    <div
      className={`multi-select ${disabled ? "disabled" : ""} ${customClassName || ""}`}
      ref={dropdownRef}
      style={{
        "--ms-primary-color": theme?.primaryColor,
        "--ms-primary-hover": theme?.primaryHover,
        "--ms-bg-color": theme?.bgColor,
        "--ms-border-color": theme?.borderColor,
        "--ms-text-color": theme?.textColor,
        "--ms-placeholder-color": theme?.placeholderColor,
        "--ms-item-hover-bg": theme?.itemHoverBg,
        "--ms-selected-bg": theme?.selectedBg,
        "--ms-selected-color": theme?.selectedColor,
        "--ms-disabled-bg": theme?.disabledBg,
        "--ms-disabled-color": theme?.disabledColor,
        "--ms-border-radius": theme?.borderRadius,
        "--ms-font-size": theme?.fontSize,
        "--ms-header-height": theme?.headerHeight,
      } as React.CSSProperties}
    >
      {/* Header */}
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="dropdownText">
          {value.length === 0
            ? placeholder
            : isAllSelected
              ? selectAllText
              : selectedLabels.join(", ")
          }
        </span>
        <span className={`${isOpen ? "arrowUp" : "arrowDown"}`}></span>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="dropdown-list">
          {/* Search */}
          {searchable && (
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          )}

          {/* Select All (GLOBAL) */}
          {options.length > 0 && (
            <label className="dropdown-item select-all">
              <span>{selectAllText} </span>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </label>
          )}

          {/* Options */}
          {groupBy ? (
            (filteredOptions as any[]).map((group: any, groupIndex) => (
              <div key={`group-${groupIndex}`} className="option-group">
                <div className="group-label">{group.label}</div>
{group.options.length > 0 ? (
                   group.options.map((option: Option, optionIndex: number) => (
                    <label
                      key={`${groupIndex}-${optionIndex}`}
                      className={`dropdown-item ${value.includes(option.value) ? "active" : ""}`}
                    >
                      {renderOption ? (
                        renderOption(option)
                      ) : (
                        <>
                          <span>{option.label}</span>
                          <input
                            type="checkbox"
                            checked={value.includes(option.value)}
                            onChange={() => handleCheckboxChange(option.value)}
                          />
                        </>
                      )}
                    </label>
                  ))
                ) : (
                  <div className="no-data">No results found</div>
                )}
              </div>
            ))
          ) : (
            filteredOptions.length > 0 ? (
              filteredOptions.map((option: Option) => (
                <label
                  key={option.value}
                  className={`dropdown-item ${value.includes(option.value) ? "active" : ""}`}
                >
                  {renderOption ? (
                    renderOption(option)
                  ) : (
                    <>
                      <span>{option.label}</span>
                      <input
                        type="checkbox"
                        checked={value.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                      />
                    </>
                  )}
                </label>
              ))
            ) : (
              <div className="no-data">No results found</div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;