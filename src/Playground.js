import React from 'react';
import Hooks from './component/Hooks';
import TaskLogin from './component/TaskLogin';
import TaskRegister from './component/TaskRegister';
import TaskMainView from './component/TaskMainView';
import Unauthorized from './component/Unauthorized';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Playground = () => {
    return (
        // router used to route between entry point components which implements different exercises
        //hooks - simple example of hooks
        //task - app to learn how to use: frontend - hooks, formik (building forms), validation; backend - REST, authentication, mongodb
        <BrowserRouter>
            <Routes>
                <Route path="/hooks" element={<Hooks />} />
                <Route path="/task/login" element={<TaskLogin />} />
                <Route path="/task/register" element={<TaskRegister />} />
                <Route path="/task/mainview" element={<TaskMainView />} />
                <Route path="/task/unauthorized" element={<Unauthorized />} />
                {/* <Redirect from="/" to="/task/login" exact /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Playground;
