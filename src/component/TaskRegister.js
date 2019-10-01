import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PgInput from './PgInput';
import { Card, CardBody, CardTitle, Button, FormFeedback, Input } from 'reactstrap';
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
        .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])/, 'Password must have at least one: large and small letter, number, special character "!@#$%^&*())"')
        .required('Password is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid')
});

const TaskRegister = (props) => {
    const handleSubmit = async (values, actions) => {
        const result = await postXhr('/task/register', values);
        if (result && result.userRegistered) {
            actions.setStatus({ msg: `Dear ${values.username}, you signed up successfully.` });
            // if (passwordMatched) {
            //     //case when all ok. navigate to task main view which requires authentication
            //     props.history.push('/hooks');
            // } else {
            //     actions.setErrors({ password: 'Password does not match' });
            // }
        } else {
            console.log('result: ', result);
            // actions.setErrors({ username: 'User does not exist' });
        }
        actions.setSubmitting(false);
    }

    return (
        <div className="app d-flex justify-content-center align-items-center">
            <Card className="loginCard">
                <CardBody>
                    <CardTitle>Please sign up to use Task App</CardTitle>
                    <Formik
                        initialValues={{ username: '', password: '', email: '' }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleSubmit}
                        component={({ isValid, isSubmitting, status }) => (
                            < Form >
                                <Field component={PgInput} name="username" className="mt-1" type="text" placeholder="user name" />
                                <Field component={PgInput} name="password" className="mt-1" type="password" placeholder="password" />
                                <Field component={PgInput} name="email" className="mt-1" type="text" placeholder="example@domian.com" />

                                {status && status.msg ? (<div>
                                    <Input type="hidden" valid />
                                    <FormFeedback valid>{status.msg}</FormFeedback>
                                </div>
                                ) : ''}
                                <div className="d-flex flex-row justify-content-between mt-2">
                                    <Button type="submit" disabled={!isValid || isSubmitting} color="primary">sign up</Button>
                                    <Link className="align-self-end" to="/task/login">cancel</Link>
                                </div>
                            </Form>
                        )}
                    />
                </CardBody>
            </Card>
        </div >
    );
}
export default withRouter(TaskRegister);