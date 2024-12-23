import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

export const NewMultiSelectWithImage = ({
  SelectLabel,
  options,
  name,
  selectedData,
  id,
  value,
  isClear = false,
  setClearPrefill,
  redirectHandler,
  error,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);


  useEffect(() => {
    selectedData(selectedOptions);
    if (setClearPrefill) {
      setClearPrefill(false);
    }
  }, [selectedOptions]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([...options]);
    }
  };

  useEffect(() => {
    if (isClear) {
      setSelectedOptions([]);
    }
  }, [isClear]);

  useEffect(() => {
    if (value !== undefined) {
      const setOp = [];
      const data = value?.split(",");
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < options.length; j++) {
          if (data[i] === options[j].id) {
            setOp.push({
              id: options[j].id,
              label: options[j].label,
              profile: options[j]?.profile,
            });
          }
        }
      }

      setSelectedOptions(setOp);
    }
  }, [value]);

  const handleOptionToggle = (option) => {
    if (selectedOptions.some((item) => item.id === option.id)) {
      setSelectedOptions(
        selectedOptions.filter((item) => item.id !== option.id)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const renderMenu = (results, menuProps) => (
    <div className="MultiSelected" {...menuProps}>
      <div>
        <input
          type="checkbox"
          checked={selectedOptions.length === options.length}
          onChange={handleSelectAll}
        />
        <span>Select All</span>
        <hr className="mt-1 mb-0" />
      </div>
      <div className="MultiSelectedDrop">
        {results.map((result, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={selectedOptions.some((item) => item.id === result.id)}
              onChange={() => handleOptionToggle(result)}
            />
            <img
              src={result?.profile || "./assets/images/profileHolder.png"}
              alt=""
              style={{ width: "2rem", cursor: "pointer", marginLeft: "5px" }}
              onClick={() => redirectHandler(result.id)}
            />
            <span
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={() => redirectHandler(result.id)}
            >
              {result.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <label className="form-label inputLable">{SelectLabel}</label>

      <Typeahead
        id="my-typeahead-id"
        multiple
        name={name}
        options={options}
        selected={selectedOptions}
        onChange={handleChange}
        placeholder="Select options"
        labelKey="label"
        renderMenu={renderMenu}
        renderToken={(option, props, index) => (
          <div
            key={index}
            className="selected-token"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 5px",
              margin: "2px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <img
              src={option?.profile || "./assets/images/profileHolder.png"}
              alt=""
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                marginRight: "5px",
              }}
            />
            {option.label}
            <span
              style={{
                marginLeft: "5px",
                cursor: "pointer",
                color: "red",
                fontWeight: "bold",
              }}
              onClick={() => handleOptionToggle(option)}
            >
              &times;
            </span>
          </div>
        )}
      />
    </>
  );
};
