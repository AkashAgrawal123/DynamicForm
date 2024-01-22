import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const DynamicForm = ({ fields, onSubmit, renderFormField, onChange }) => {
  const initialValues = {};

  fields.forEach((field) => {
    initialValues[field.name] =
      field.type === "checkbox" || field.type === "radio" ? false : "";
  });

  const validationSchema = Yup.object().shape(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {})
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="dynamic-form__wrapper">
        {fields.map((field) => (
          <div key={field.name} className="dynamic-form__field--wrapper">
            {renderFormField(field, onChange)}
            <ErrorMessage name={field.name} component="div" />
          </div>
        ))}
        <button className="dynamic-form__submit-button mukta" type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default DynamicForm;