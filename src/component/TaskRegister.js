import React from 'react';
import { Link } from 'react-router-dom';
import PgInput from './PgInput';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    FormFeedback,
    Input
} from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import { postXhr } from '../common/utils';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'User name is too short')
        .max(50, 'User name is too long')
        .required('Username is required'),
    password: Yup.string()
        .min(8, 'Password too short')
        .matches(
            /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])/,
            'Password must have at least one: large and small letter, number, special character "!@#$%^&*())"'
        )
        .required('Password is required'),
    email: Yup.string().required('Email is required').email('Email is invalid')
});

const TaskRegister = () => {
    const handleSubmit = async (values, actions) => {
        //check if password match with retyped one
        if (values.password === values.retypedpassword) {
            const { userRegistered, statusList } = await postXhr(
                '/task/signupUser',
                values
            );
            if (userRegistered) {
                actions.setStatus({
                    msg: `Dear ${values.username}, you have signed up successfully.`
                });
            } else {
                const errorObj = {};
                statusList.forEach(([key, , msg]) => {
                    errorObj[key] = msg;
                });
                actions.setErrors(errorObj);
            }
        } else {
            actions.setErrors({
                retypedpassword: 'Passwords do not match'
            });
        }

        actions.setSubmitting(false);
    };

    return (
        <div className="app d-flex justify-content-center align-items-center">
            <Card className="loginCard">
                <CardBody>
                    <CardTitle>Please sign up to use Task App</CardTitle>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                            email: '',
                            retypedpassword: ''
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleSubmit}
                        component={({ isValid, isSubmitting, status }) => (
                            <Form>
                                <Field
                                    component={PgInput}
                                    name="username"
                                    className="mt-1"
                                    type="text"
                                    placeholder="user name"
                                />
                                <Field
                                    component={PgInput}
                                    name="password"
                                    className="mt-1"
                                    type="password"
                                    placeholder="password"
                                />
                                <Field
                                    component={PgInput}
                                    name="retypedpassword"
                                    className="mt-1"
                                    type="password"
                                    placeholder="retype password"
                                />
                                <Field
                                    component={PgInput}
                                    name="email"
                                    className="mt-1"
                                    type="text"
                                    placeholder="example@domian.com"
                                />

                                {status && status.msg ? (
                                    <div>
                                        <Input type="hidden" valid />
                                        <FormFeedback valid>
                                            {status.msg}
                                        </FormFeedback>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <div className="d-flex flex-row justify-content-between mt-2">
                                    <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                        color="secondary"
                                    >
                                        sign up
                                    </Button>
                                    <Link
                                        className="align-self-end"
                                        to="/task/login"
                                    >
                                        cancel
                                    </Link>
                                </div>
                            </Form>
                        )}
                    />
                </CardBody>
            </Card>
        </div>
    );
};
export default TaskRegister;
