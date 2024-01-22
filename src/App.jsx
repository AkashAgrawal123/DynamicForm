import React, { useState } from "react";
import "./App.scss";
import DynamicForm from "./Components/DynamicForm";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./Components/TextInput";
import Dropdown from "./Components/Dropdown";
import Checkbox from "./Components/Checkbox";
import Radio from "./Components/Radio";
import TextArea from "./Components/TextArea";

import {
  addFormField,
  removeFormField,
  updateFormFields,
  updateLabelName,
} from "./Services/Actions/index";

const App = () => {
  const dispatch = useDispatch();
  const formFields = useSelector((state) => state.FormReducer.fields);
  const [counter, setCounter] = useState(0);
  const [selectedFields, setSelectedFields] = useState([]);
  const [showCheckbox, setShowCheckBox] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleSubmit = (values) => {
    const errors = validateForm(values);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted!");
    } else {
      setValidationError(errors);
    }
  };

  const renderSpecificFormField = (field, handleFieldChange) => {
    switch (field.type) {
      case "text":
        return (
          <TextInput
            {...field}
            onChange={handleFieldChange}
            error={validationError[field.name]}
          />
        );
      case "dropdown":
        return (
          <Dropdown
            {...field}
            onChange={handleFieldChange}
            error={validationError[field.name]}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            {...field}
            onChange={handleFieldChange}
            error={validationError[field.name]}
          />
        );
      case "radio":
        return (
          <Radio
            {...field}
            groupname="radioGroup"
            onChange={handleFieldChange}
            error={validationError[field.name]}
          />
        );
      case "textarea":
        return (
          <TextArea
            {...field}
            onChange={handleFieldChange}
            error={validationError[field.name]}
          />
        );
      default:
        return null;
    }
  };

  const renderFormField = (field) => {
    const isFieldSelected = selectedFields.includes(field.name);

    const handleFieldChange = (fieldName, value) => {
      dispatch(updateFormFields(fieldName, value));
      setValidationError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: null,
      }));
    };

    return (
      <div key={field.name}>
        {showCheckbox && (
          <input
            type="checkbox"
            checked={isFieldSelected}
            onChange={() => toggleSelectField(field.name)}
            className="selected-checkbox"
          />
        )}
        {renderSpecificFormField(field, handleFieldChange)}
      </div>
    );
  };

  const validateForm = (values) => {
    let errors = {};

    for (const fieldName in values) {
      const field = formFields.find((f) => f.name === fieldName);
      if (!field) continue;

      switch (field.type) {
        case "text":
          if (!values[fieldName]?.trim()) {
            errors[fieldName] = "Please fill in the required field.";
          }
          break;
        case "textarea":
          if (!values[fieldName]?.trim()) {
            errors[fieldName] = "Please fill in the required field.";
          }
          break;
        case "dropdown":
          if (!values[fieldName]) {
            errors[fieldName] = "Please select an option.";
          }
          break;
        case "checkbox":
          if (!values[fieldName]) {
            errors[fieldName] = "Please check the box.";
          }
          break;
        case "radio":
          if (!values[fieldName]) {
            errors[fieldName] = "Please select an option.";
          }
          break;
        default:
          break;
      }
    }

    console.log("Form validation errors:", errors);

    return errors;
  };

  const addTextInput = () => {
    const label = prompt("please enter a label name of the input field");
    if (label != null) {
      dispatch(
        addFormField({
          name: `newInput${counter}`,
          label: label,
          type: "text",
        })
      );
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  const addTextarea = () => {
    const label = prompt("please enter a label name of the textarea field");
    if (label != null) {
      dispatch(
        addFormField({
          name: `newTextarea${counter}`,
          label: label,
          type: "textarea",
        })
      );
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  const addDropdown = () => {
    const label = prompt("please enter a label name of the dropdown field");
    if (label != null) {
      dispatch(
        addFormField({
          name: `newDropdown${counter}`,
          label: label,
          type: "dropdown",
          options: ["Option 1", "Option 2"],
        })
      );
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  const addCheckbox = () => {
    const label = prompt("please enter a label name of the checkbox field");
    if (label != null) {
      dispatch(
        addFormField({
          name: `newCheckbox${counter}`,
          label: label,
          type: "checkbox",
        })
      );
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  const addRadio = () => {
    const label = prompt("please enter a label name of the radio button field");
    if (label != null) {
      dispatch(
        addFormField({
          name: `newRadio${counter}`,
          label: label,
          type: "radio",
          options: ["Option 1", "Option 2"],
        })
      );
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  const removeField = () => {
    selectedFields.forEach((fieldName) => dispatch(removeFormField(fieldName)));
    setSelectedFields([]);
    setShowCheckBox(false);
  };

  const toggleSelectField = (fieldName) => {
    if (selectedFields.includes(fieldName)) {
      setSelectedFields(
        selectedFields.filter((selected) => selected !== fieldName)
      );
    } else {
      setSelectedFields([...selectedFields, fieldName]);
    }
  };

  const selectItems = () => {
    setShowCheckBox(true);
  };

  const updateFields = () => {
    if (selectedFields.length > 0) {
      selectedFields.forEach((fieldName) => {
        const currentField = formFields.find(
          (field) => field.name === fieldName
        );
        const newLabel = prompt(
          `Enter a new label for ${currentField.label}:`,
          currentField.label
        );
        if (newLabel !== null) {
          dispatch(updateLabelName(fieldName, newLabel));
        }
      });

      setSelectedFields([]);
      setShowCheckBox(false);
    }
  };

  return (
    <>
      <div className="dynamic-form">
        <h1 className="dynamic-form__heading mukta">Dynamic Form Generator</h1>
        <div className="dynamic-form__content">
          <div className="dynamic-form__input--button">
            <button
              className="dynamic-form__button mukta"
              onClick={addTextInput}
            >
              Add Input
            </button>
            <button
              className="dynamic-form__button mukta"
              onClick={addTextarea}
            >
              Add Textarea
            </button>
            <button
              className="dynamic-form__button mukta"
              onClick={addDropdown}
            >
              Add Dropdown
            </button>
            <button
              className="dynamic-form__button mukta"
              onClick={addCheckbox}
            >
              Add Checkbox
            </button>
            <button className="dynamic-form__button mukta" onClick={addRadio}>
              Add Radio
            </button>
            {selectedFields.length > 0 && (
              <button
                className="dynamic-form__button mukta"
                onClick={removeField}
              >
                Remove Selected
              </button>
            )}
            {formFields.length > 0 && (
              <button
                className="dynamic-form__button mukta"
                onClick={updateFields}
              >
                Update fields
              </button>
            )}
            <button
              className="dynamic-form__button mukta"
              onClick={selectItems}
            >
              Select Items
            </button>
          </div>
          <div className="dynamic-form__input-field">
            <DynamicForm
              fields={formFields}
              onSubmit={handleSubmit}
              renderFormField={renderFormField}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
