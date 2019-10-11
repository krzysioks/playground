import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import PgInput from './PgInput';
import { Card, CardBody, Button, Label } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
// import { postXhr } from '../common/utils';
import * as Yup from 'yup';

const TaskSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'User name is too short')
        .max(50, 'User name is too long')
        .required('Name of the task is required')
});

const TaskMainView = props => {
    const [item] = useLocalStorage('token');
    const [isVisibleAddForm, setAddFormVisibility] = useState('visible');

    const handleSubmit = async (values, actions) => {
        setAddFormVisibility('invisible');
        console.log('values, actions: ', values, actions);
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <Formik
                        initialValues={{ name: '' }}
                        validationSchema={TaskSchema}
                        onSubmit={handleSubmit}
                        component={({ isValid, isSubmitting }) => (
                            < Form >
                                <div className="d-flex flex-row">
                                    <Button disabled={!isValid || isSubmitting} color="primary">Add</Button>
                                    <div className={`d-flex flex-row ${isVisibleAddForm}`}>
                                        <Field component={PgInput} name="name" className="mx-2" type="text" placeholder="task name" />
                                        <div className="position-relative statusContainer">
                                            <Field component={PgInput} name="status" type="checkbox" id="_taskstatus" />
                                            <Label className="position-relative statusLabel" for="_taskstatus" >completed</Label>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    />
                </CardBody>
            </Card>
        </div>
    );
}
export default withRouter(TaskMainView);