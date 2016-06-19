"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";

import LVApp from "./components/LVApp.react";
import LoginSection from "./components/LoginSection.react.js";
import FeedSection from "./components/FeedSection.react";
import * as check from './helper/helper';

const app = document.getElementById("lvapp");

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={LVApp}>
            <IndexRoute component={FeedSection} onEnter={check.loginCheck}/>
            <Route path="/login" component={LoginSection}/>
        </Route>
    </Router>, app
);
