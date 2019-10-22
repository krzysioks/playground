import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import { Link, withRouter } from 'react-router-dom';
import PgInput from './PgInput';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import { postXhr } from '../common/utils';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'User name is too short')
        .max(50, 'User name is too long')

        .required('Username is required'),
    password: Yup.string()
        .min(8, 'Password too short')
        .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])/, 'Password must have at least one: large and small letter, number, special character "!@#$%^&*())"')
        .required('Password is required')
});

const TaskLogin = (props) => {
    const [, setItem] = useLocalStorage('token', '');
    // useEffect hook is called after every render. To simulate componentDidMount lifecycle method pass empty array as a second argument. useEffect() will be called after render only if any parameter from the list have changed.
    // useEffect(() => {
    //     fetch('./test')
    //         .then(res => res.json())
    //         .then(response => {
    //             console.log('response', response);
    //         });
    // }, []);
    // const [counter, setCounter] = useState(0);
    // const _onClickHandler = () => {
    //     const newValue = counter + 1;
    //     setCounter(newValue);
    // };
    const handleSubmit = async (values, actions) => {
        const { isUser, passwordMatched, token } = await postXhr('/task/login', values);
        if (isUser) {
            if (passwordMatched) {
                //case when all ok. navigate to task main view which requires authentication and pass token in localStorage
                setItem(token);
                props.history.push('/task/mainview');
            } else {
                actions.setErrors({ password: 'Password does not match' });
            }
        } else {
            actions.setErrors({ username: 'User does not exist' });
        }
        actions.setSubmitting(false);
    };

    return (
        <div className="app d-flex justify-content-center align-items-center">
            <Card className="loginCard">
                <CardBody>
                    <CardTitle>Welcome to Task App</CardTitle>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={LoginSchema}//schema used to validate form fields
                        //below are destructured Formik props, which represent the state of form (i.e. if it is valid or not, if any value changed...)
                        onSubmit={handleSubmit}
                        component={({ isValid, isSubmitting }) => (
                            < Form >
                                <Field component={PgInput} name="username" className="mt-1" type="text" placeholder="user name" />
                                {/* PgInput wraps reactstrap form input component and add error msg
                                 placeholder so it is possible to use material design components with Formik */}
                                <Field component={PgInput} name="password" className="mt-1" type="password" placeholder="password" />
                                <div className="d-flex flex-row justify-content-between mt-2">
                                    <Button disabled={!isValid || isSubmitting} color="secondary">log in</Button>
                                    <Link className="align-self-end" to="/task/register">register</Link>
                                </div>
                            </Form>
                        )}
                    />
                </CardBody>
            </Card>
        </div >
    );
};
export default withRouter(TaskLogin);