import Playground from "./Playground";
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./style/base.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Playground />, document.getElementById("playground"));
registerServiceWorker();
