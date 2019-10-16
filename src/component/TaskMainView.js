import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import PgInput from './PgInput';
import { Card, CardBody, Button, Label, Table } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import { getXhr } from '../common/utils';
import * as Yup from 'yup';

const TaskSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'User name is too short')
        .max(50, 'User name is too long')
        .required('Name of the task is required')
});

const TaskMainView = props => {
    const [token] = useLocalStorage('token');
    const [taskList, setTaskList] = useState([]);

    // useEffect hook is called after every render. To simulate componentDidMount lifecycle method pass empty array as a second argument. useEffect() will be called after render only if any parameter from the list have changed.
    useEffect(() => {
        (async () => {
            try {
                const { tasks } = await getXhr(`/task/all`, {
                    'x-auth': token
                });
                console.log('result: ', tasks);
                setTaskList(tasks);
            } catch (err) {
                console.info('test');
                props.history.push('/task/unauthorized');
            }
        })();
    }, []);

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
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
                            {taskList.length ? taskList.map(({ name, status, creationDate }, key) => (
                                <tr key={key}>
                                    <td>{name}</td>
                                    <td>{new Date(creationDate).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td>{status ? 'Completed' : 'Not Completed'}</td>
                                    <td>edit delete status</td>
                                </tr>
                            )) : (<tr><td colSpan='4'>No data to display</td></tr>)}
                        </tbody>
                    </Table>

                </CardBody>
            </Card>
        </div>
    );
}
export default withRouter(TaskMainView);

