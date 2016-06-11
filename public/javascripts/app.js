"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import LVApp from "./components/LVApp.react";
import LoginSection from "./components/LoginSection.react.js";

const app = document.getElementById("lvapp");

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={LVApp}>
            <IndexRoute component={LoginSection}></IndexRoute>
        </Route>
    </Router>, app
);
