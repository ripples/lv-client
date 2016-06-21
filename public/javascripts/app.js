"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import LVApp from "./components/LVApp.react";
import LoginSection from "./components/LoginSection.react.js";
import FeedSection from "./components/FeedSection.react";
import {loginCheck} from "./stores/LoginStore";

const app = document.getElementById("lvapp");

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LVApp}>
      <IndexRoute component={FeedSection} onEnter={loginCheck}/> 
      <Route path="/login" component={LoginSection}/>
    </Route>
  </Router>, app
);
