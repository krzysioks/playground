import React from 'react';
import Hooks from './component/Hooks';
import TaskLogin from './component/TaskLogin';
import TaskRegister from './component/TaskRegister';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

const Playground = () => {
    return (
        // router used to route between entry point components which implements different exercises
        //hooks - simple example of hooks
        //task - app to learn how to use: frontend - hooks, formik (building forms), validation; backend - REST, authentication, mongodb
        <HashRouter>
            <Switch>
                <Route path="/hooks" component={Hooks} />
                <Route path="/task/login" component={TaskLogin} />
                <Route path="/task/register" component={TaskRegister} />
                <Redirect from="/" to="/task/login" exact />
            </Switch>
        </HashRouter>
    );
};

export default Playground;