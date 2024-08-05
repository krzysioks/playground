import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom';
import PgInput from './PgInput';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { postXhr } from '../common/utils';
import * as Yup from 'yup';

interface ValuesType {
    password: string;
    username: string;
}

const LoginSchema = Yup.object().shape({
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
        .required('Password is required')
});

const TaskLogin: React.FC = (): React.JSX.Element => {
    const [, setItem] = useLocalStorage('token', '');
    const navigate = useNavigate();
    const handleSubmit = async (
        values: ValuesType,
        { setErrors, setSubmitting }: FormikHelpers<ValuesType>
    ) => {
        const { isUser, passwordMatched, token } = await postXhr(
            '/task/login',
            values
        );
        if (isUser) {
            if (passwordMatched) {
                //case when all ok. navigate to task main view which requires authentication and pass token in localStorage
                setItem(token as string);
                navigate('/task/mainview');
            } else {
                setErrors({ password: 'Password does not match' });
            }
        } else {
            setErrors({ username: 'User does not exist' });
        }
        setSubmitting(false);
    };

    const handleRegister: React.EventHandler<React.SyntheticEvent> = () => {
        navigate('/task/register');
    };

    return (
        <div className="app d-flex justify-content-center align-items-center">
            <Card className="loginCard">
                <CardBody>
                    <CardTitle>Welcome to Task App</CardTitle>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={LoginSchema} //schema used to validate form fields
                        //below are destructured Formik props, which represent the state of form (i.e. if it is valid or not, if any value changed...)
                        onSubmit={handleSubmit}
                        component={({ isValid, isSubmitting }) => (
                            <Form>
                                <Field
                                    component={PgInput}
                                    name="username"
                                    className="mt-1"
                                    type="text"
                                    placeholder="user name"
                                />
                                {/* PgInput wraps reactstrap form input component and add error msg
                                 placeholder so it is possible to use material design components with Formik */}
                                <Field
                                    component={PgInput}
                                    name="password"
                                    className="mt-1"
                                    type="password"
                                    placeholder="password"
                                />
                                <div className="d-flex flex-row justify-content-between mt-2">
                                    <Button
                                        disabled={!isValid || isSubmitting}
                                        color="secondary"
                                    >
                                        log in
                                    </Button>
                                    <Button
                                        onClick={handleRegister}
                                        className="align-self-end"
                                    >
                                        register
                                    </Button>
                                </div>
                            </Form>
                        )}
                    />
                </CardBody>
            </Card>
        </div>
    );
};
export default TaskLogin;
