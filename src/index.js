import Playground from "./Playground";
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./style/base.css";
// import registerServiceWorker from "./registerServiceWorker";
import * as runtime from "offline-plugin/runtime";
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
ReactDOM.render(<Playground />, document.getElementById("playground"));
// registerServiceWorker();
