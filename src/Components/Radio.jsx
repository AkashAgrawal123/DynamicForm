import React from "react";

const Radio = ({ label, options, name, onChange,error, ...props }) => (
  <div className="dynamic-form__radio">
    <label className="dynamic-form__label mukta">{label}</label>
    {options.map((option) => (
      <div key={option} className="dynamic-form__radio-button--wrapper">
        <input
          className="dynamic-form__radio-input mukta"
          type="radio"
          name={name}
          value={option}
          onChange={() => onChange(option)}
          {...props}
        />
        <label className="mukta">{option}</label>
      </div>
    ))}
     {error && <div className="dynamic-form__error-message">{error}</div>}
  </div>
);

export default Radio;
