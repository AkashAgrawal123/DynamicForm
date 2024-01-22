import React from "react";

const TextArea = ({ label, onChange,error, ...props }) => (
  <div className="dynamic-form__textarea">
    <label className="dynamic-form__label mukta">{label}</label>
    <textarea
      {...props}
      className="dynamic-form__textarea-field mukta"
      onChange={(e) => onChange(props.name, e.target.value)}
    />
     {error && <div className="dynamic-form__error-message">{error}</div>}
  </div>
);

export default TextArea;
