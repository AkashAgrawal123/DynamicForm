import React from "react";

const Dropdown = ({ label, options, onChange,error, ...props }) => (
  <div className="dynamic-form__dropdown">
    <label className="dynamic-form__label mukta">{label}</label>
    <select onChange={(e) => onChange(e.target.value)} {...props}>
      {options.map((option) => (
        <option
          className="dynamic-form__option-input mukta"
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
    {error && <div className="dynamic-form__error-message">{error}</div>}
  </div>
);

export default Dropdown;
