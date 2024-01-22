import React from "react";

const Checkbox = ({ label, onChange, error, ...props }) => (
  <div className="dynamic-form__checkbox">
    <label className="dynamic-form__label mukta">{label}</label>
    <input
      className="dynamic-form__input mukta"
      type="checkbox"
      onChange={(e) => onChange(e.target.checked)}
      {...props}
    />
    {error && <div className="dynamic-form__error-message">{error}</div>}
  </div>
);

export default Checkbox;
