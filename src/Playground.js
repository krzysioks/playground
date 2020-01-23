import React from "react";
import Hooks from "./component/Hooks";
import TaskLogin from "./component/TaskLogin";
import TaskRegister from "./component/TaskRegister";
import TaskMainView from "./component/TaskMainView";
import Unauthorized from "./component/Unauthorized";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import * as runtime from "offline-plugin/runtime";

const Playground = () => {
  runtime.install({
    onUpdating: () => {
      console.log("SW Event:", "onUpdating");
    },
    onUpdateReady: () => {
      console.log("SW Event:", "onUpdateReady");
      // Tells to new SW to take control immediately
      runtime.applyUpdate();
    },
    onUpdated: () => {
      console.log("SW Event:", "onUpdated");
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
      console.log("SW Event:", "onUpdateFailed");
    }
  });
  return (
    // router used to route between entry point components which implements different exercises
    //hooks - simple example of hooks
    //task - app to learn how to use: frontend - hooks, formik (building forms), validation; backend - REST, authentication, mongodb
    <HashRouter>
      <Switch>
        <Route path="/hooks" component={Hooks} />
        <Route path="/task/login" component={TaskLogin} />
        <Route path="/task/register" component={TaskRegister} />
        <Route path="/task/mainview" component={TaskMainView} />
        <Route path="/task/unauthorized" component={Unauthorized} />
        <Redirect from="/" to="/task/login" exact />
      </Switch>
    </HashRouter>
  );
};

export default Playground;
