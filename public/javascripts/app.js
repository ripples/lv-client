"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import LVApp from "./components/LVApp.react";
import loginStore from "./stores/LoginStore";

import LoginSection from "./components/LoginSection.react.js";
import FeedSection from "./components/FeedSection.react";
import MediaComponent from "./components/MediaComponent.react";

const app = document.getElementById("lvapp");
import utils from "./utils/defaultBehavior";
// runs the page behaviors, not sure exactly where to put this yet
utils();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LVApp}>
      <IndexRoute component={FeedSection} onEnter={loginCheck}/>
      <Route path="/login" component={LoginSection}/>
      <Route path="/courses/:courseId"/>
      <Route path="/courses/:courseId/:lectureName" component={MediaComponent}/>
    </Route>
  </Router>, app
);

function loginCheck(nextState, replace) {
  if (!loginStore.isLoggedIn()) {
    replace("/login");
  }
}
function logoutCheck(nextState, replace) {
  if (loginStore.isLoggedIn()) {
    replace("/");
  }
}
