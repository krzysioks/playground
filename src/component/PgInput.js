import React from "react";
import { Input, FormFeedback } from "reactstrap";

const PgInput = ({ field, form: { touched, errors }, ...props }) => (
  <div>
    <Input
      {...field}
      {...props}
      invalid={!!(touched[field.name] && errors[field.name])}
    />
    {touched[field.name] && errors[field.name] && (
      <FormFeedback>{errors[field.name]}</FormFeedback>
    )}
  </div>
);

export default PgInput;
