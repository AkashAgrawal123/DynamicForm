import {
  ADD_FORM_FIELD,
  REMOVE_FORM_FIELD,
  UPDATE_FORM_FIELDS,
  UPDATE_LABEL_NAME,
} from "../Constants";

export const addFormField = (field) => ({
  type: ADD_FORM_FIELD,
  payload: { ...field, value: "" },
});

export const removeFormField = (fieldName) => ({
  type: REMOVE_FORM_FIELD,
  payload: fieldName,
});

export const updateFormFields = (fieldName, value) => ({
  type: UPDATE_FORM_FIELDS,
  payload: { fieldName, value },
});

export const updateLabelName = (fieldName, label) => ({
  type: UPDATE_LABEL_NAME,
  payload: { fieldName, label },
});