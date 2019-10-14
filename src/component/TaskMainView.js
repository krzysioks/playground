import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import PgInput from './PgInput';
import { Card, CardBody, Button, Label, Table } from 'reactstrap';
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
    // const [isVisibleAddForm, setAddFormVisibility] = useState('invisible');

    const handleSubmit = async (values, actions) => {
        // setAddFormVisibility('invisible');
        console.log('values, actions: ', values, actions);
        window.setTimeout(() => {
            actions.setSubmitting(false);
            actions.resetForm();
        }, 1000);
    };

    return (
        <div>
            <Card className="dark">
                <CardBody>
                    <Button color="secondary">Refresh</Button>
                </CardBody>
                <CardBody>
                    <Formik
                        initialValues={{ name: '', status: false }}
                        validationSchema={TaskSchema}
                        onSubmit={handleSubmit}
                        component={({ isValid, isSubmitting }) => (
                            < Form >
                                <div className="d-flex flex-row">
                                    <Field component={PgInput} name="name" className="mr-2" type="text" placeholder="task name" />
                                    <div className="position-relative statusContainer">
                                        <Field component={PgInput} name="status" type="checkbox" id="_taskstatus" />
                                        <Label className="position-relative statusLabel" for="_taskstatus" >completed</Label>
                                    </div>
                                    <Button disabled={!isValid || isSubmitting} color="secondary">Add</Button>
                                </div>
                            </Form>
                        )}
                    />
                </CardBody>
                <CardBody>
                    <Table striped dark>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Created</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Buy screws</td>
                                <td>14.10.2019 09:15</td>
                                <td>not completed</td>
                                <td>edit delete change status</td>
                            </tr>
                        </tbody>
                    </Table>

                </CardBody>
            </Card>
        </div>
    );
}
export default withRouter(TaskMainView);