import React from "react";

const TextInput = ({ label, onChange, error, ...props }) => (
  <div className="dynamic-form__input-text">
    <label className="dynamic-form__label mukta">{label}</label>
    <input
      type="text"
      onChange={(e) => onChange(props.name, e.target.value)}
      {...props}
      className={`dynamic-form__input-text-field mukta ${error ? 'error':''}`}
    />
    {error && <div className="dynamic-form__error-message">{error}</div>}
  </div>
);

export default TextInput;