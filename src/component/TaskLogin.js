import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Input } from 'reactstrap';
import { Formik, Field, Form } from 'formik';

const TaskLogin = (props) => {
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
    const _handleOnClick = () => {
        console.info('test', props);
        props.history.push('/hooks');
    }

    return (
        <div className="app d-flex justify-content-center align-items-center">
            <Card className="loginCard">
                <CardBody>
                    <CardTitle>Welcome to Task App</CardTitle>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        component={() => (
                            <Form>
                                <Field className="mt-1" component={Input} type="text" name="username" placeholder="user name" />
                                <Field className="mt-1" component={Input} type="password" name="password" placeholder="password" />

                                <div className="d-flex flex-row justify-content-between mt-2">
                                    <Button onClick={_handleOnClick} color="primary">log in</Button>
                                    <Link className="align-self-end" to="/task/register">register</Link>
                                </div>
                            </Form>
                        )}
                    />
                </CardBody>
            </Card>
        </div>
    );
}
export default withRouter(TaskLogin);