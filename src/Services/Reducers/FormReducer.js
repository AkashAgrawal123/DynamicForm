import {
  ADD_FORM_FIELD,
  REMOVE_FORM_FIELD,
  UPDATE_FORM_FIELDS,
  UPDATE_LABEL_NAME,
} from "../Constants";

const FormReducer = (state = { fields: [] }, action) => {
  switch (action.type) {
    case ADD_FORM_FIELD:
      return { ...state, fields: [...state.fields, action.payload] };

    case REMOVE_FORM_FIELD:
      return {
        ...state,
        fields: state.fields.filter((field) => field.name !== action.payload),
      };

    case UPDATE_FORM_FIELDS:
      return {
        ...state,
        fields: state.fields.map((field) =>
          field.name === action.payload.fieldName
            ? { ...field, value: action.payload.value }
            : field
        ),
      };
    case UPDATE_LABEL_NAME:
      return {
        ...state,
        fields: state.fields.map((field) =>
          field.name === action.payload.fieldName
            ? { ...field, label: action.payload.label }
            : field
        ),
      };

    default:
      return state;
  }
};

export default FormReducer;
