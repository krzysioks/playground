import React from 'react';
import { Input, FormFeedback } from 'reactstrap';

interface FieldType {
    name: string;
    value: string;
    onBlur: () => {};
    onChange: () => {};
}

interface PropType {
    field: FieldType;
    placeholder: string;
    form: Record<string, any>;
}

const PgInput: React.FC<PropType> = (props): React.JSX.Element => {
    const {
        field,
        form: { touched, errors },
        ...rest
    } = props;

    return (
        <div>
            <Input
                {...field}
                {...rest}
                invalid={!!(touched[field.name] && errors[field.name])}
            />
            {touched[field.name] && errors[field.name] && (
                <FormFeedback>{errors[field.name]}</FormFeedback>
            )}
        </div>
    );
};

export default PgInput;
