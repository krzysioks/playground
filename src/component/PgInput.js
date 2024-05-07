import React from 'react';
import { object, shape, string } from 'prop-types';
import { Input, FormFeedback } from 'reactstrap';

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

PgInput.propTypes = {
    field: shape({
        name: string
    }),
    form: shape({
        touched: object,
        errors: object
    })
};

export default PgInput;
