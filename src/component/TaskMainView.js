import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import PgInput from './PgInput';
import {
    Card,
    CardBody,
    Button,
    Label,
    Table,
    Input,
    FormFeedback
} from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import { getXhr, postXhr } from '../common/utils';
import { MdModeEdit, MdDelete, MdDone, MdUndo } from 'react-icons/md';
import * as Yup from 'yup';

const TaskSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name of task is too short')
        .max(160, 'Name of task is too long')
        .required('Name of the task is required')
});

const TaskMainView = () => {
    const [token] = useLocalStorage('token');

    const navigate = useNavigate();

    const [taskList, setTaskList] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [editRowId, setEditRowId] = useState(null);

    //useRef to get reference to formik component to be able to reset form from refresh button
    const refForm = useRef(null);

    // useEffect hook is called after every render. To simulate componentDidMount lifecycle method pass empty array as a second argument. useEffect() will be called after render only if any parameter from the list have changed.
    useEffect(() => {
        getTaskList();
    }, []);

    const handleSubmit = async (values, actions) => {
        try {
            const { taskAdded, statusList } = await postXhr(
                '/task/add',
                values,
                {
                    'x-auth': token
                }
            );
            if (taskAdded) {
                actions.resetForm();
                actions.setStatus({ msg: 'Task added' });
                await getTaskList();
                window.setTimeout(() => {
                    actions.setStatus({ msg: '' });
                }, 5000);
            } else {
                const errorObj = {};
                statusList.forEach(([key, , msg]) => {
                    errorObj[key] = msg;
                });
                actions.setErrors(errorObj);
            }
            actions.setSubmitting(false);
        } catch (err) {
            setIsAuthorized(false);
            navigate('/task/unauthorized');
        }
    };

    const handleEditMode = async key => {
        const keyToSet = key === editRowId ? null : key;
        setEditRowId(keyToSet);
    };

    const handleAction = async (url, body) => {
        try {
            await postXhr(url, body, {
                'x-auth': token
            });
            getTaskList();
        } catch (err) {
            setIsAuthorized(false);
            navigate('/task/unauthorized');
        }
    };

    const handleKeyDown = async (_id, evt) => {
        if (evt.keyCode === 13) {
            handleAction('/task/edit', {
                _id,
                name: evt.target.value
            });
        }
    };

    const handleLogout = async () => {
        try {
            await postXhr(
                '/task/logout',
                {},
                {
                    'x-auth': token
                }
            );
            navigate('/task/login');
        } catch (err) {
            setIsAuthorized(false);
            navigate('/task/unauthorized');
        }
    };

    const getTaskList = async () => {
        try {
            //if any field in the row is in edit mode -> turn it off
            setEditRowId(null);
            const { tasks } = await getXhr('/task/all', {
                'x-auth': token
            });
            setTaskList(tasks);
            setIsAuthorized(true);
        } catch (err) {
            setIsAuthorized(false);
            navigate('/task/unauthorized');
        }
    };

    const handleRefresh = async () => {
        //reset formik form using reference refForm
        refForm.current.handleReset();
        getTaskList();
    };

    return isAuthorized ? (
        <div>
            <Card className="dark">
                <CardBody className="d-flex flex-row justify-content-between">
                    <Button
                        className="task-btn"
                        onClick={handleRefresh}
                        color="secondary"
                    >
                        refresh
                    </Button>
                    <Button
                        className="task-btn"
                        onClick={handleLogout}
                        color="secondary"
                    >
                        logout
                    </Button>
                </CardBody>
                <CardBody>
                    <Formik
                        innerRef={refForm}
                        initialValues={{
                            name: '',
                            status: false
                        }}
                        validationSchema={TaskSchema}
                        onSubmit={handleSubmit}
                        component={({ isValid, isSubmitting, status }) => (
                            <Form>
                                <div className="d-flex flex-row w-100">
                                    <Field
                                        component={PgInput}
                                        name="name"
                                        className="mr-2"
                                        type="text"
                                        placeholder="task name"
                                        maxLength={160}
                                    />
                                    <div className="position-relative statusContainer">
                                        <Field
                                            component={PgInput}
                                            name="status"
                                            type="checkbox"
                                            className="pointer"
                                            id="_taskstatus"
                                        />
                                        <Label
                                            className="position-relative statusLabel pointer"
                                            for="_taskstatus"
                                        >
                                            completed
                                        </Label>
                                    </div>
                                    <Button
                                        disabled={!isValid || isSubmitting}
                                        className="task-btn"
                                        color="secondary"
                                    >
                                        add
                                    </Button>
                                </div>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskList.length ? (
                                taskList.map(
                                    (
                                        { name, status, creationDate, _id },
                                        key
                                    ) => (
                                        <tr key={key}>
                                            <td>
                                                {editRowId === key ? (
                                                    <Input
                                                        onKeyDown={handleKeyDown.bind(
                                                            null,
                                                            _id
                                                        )}
                                                        type="text"
                                                        defaultValue={name}
                                                    />
                                                ) : (
                                                    name
                                                )}
                                            </td>
                                            <td>
                                                {new Date(
                                                    creationDate
                                                ).toLocaleDateString('pl-PL', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td>
                                                {status
                                                    ? 'Completed'
                                                    : 'Not Completed'}
                                            </td>
                                            <td className="d-flex justify-content-sm-around">
                                                {status ? (
                                                    <div
                                                        className="pointer p-1"
                                                        onClick={handleAction.bind(
                                                            null,
                                                            '/task/edit',
                                                            {
                                                                _id,
                                                                status: false
                                                            }
                                                        )}
                                                    >
                                                        <MdUndo />
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="pointer p-1"
                                                        onClick={handleAction.bind(
                                                            null,
                                                            '/task/edit',
                                                            {
                                                                _id,
                                                                status: true
                                                            }
                                                        )}
                                                    >
                                                        <MdDone />
                                                    </div>
                                                )}
                                                <div
                                                    className="pointer p-1"
                                                    onClick={handleEditMode.bind(
                                                        null,
                                                        key
                                                    )}
                                                >
                                                    <MdModeEdit />
                                                </div>
                                                <div
                                                    className="pointer p-1"
                                                    onClick={handleAction.bind(
                                                        null,
                                                        '/task/delete',
                                                        {
                                                            _id
                                                        }
                                                    )}
                                                >
                                                    <MdDelete />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td colSpan="4">No data to display</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    ) : (
        <div>Loading...</div>
    );
};
export default TaskMainView;
