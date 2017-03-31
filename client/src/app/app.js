"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRedirect, IndexRoute} from "react-router";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import promise from "redux-promise-middleware";

import appReducer from "./reducers/app";

// utilities
import {logout, requireAuth} from "./libs/auth";
import {configureAxios} from "./libs/api";
import {lectureNameToDateString} from "./utils/media";

// core App component
import App from "./pages/App/App";
import Courses from "./pages/Courses/Courses";
import Course from "./pages/Course/Course";
import Lecture from "./pages/Lecture/Lecture";
import Login from "./pages/Login/Login";
import InstructorSettings from "./pages/InstructorSettings/InstructorSettings";
import LoginIndex from "./pages/LoginIndex/LoginIndex";
import Reset from "./pages/Reset/Reset";
import Forgot from "./pages/Forgot/Forgot";

// Configure globals
configureAxios();

// TODO: wrap in dev env var
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const mountNode = document.getElementById("lvapp");
const middleware = applyMiddleware(promise(), thunkMiddleware);
const store = createStore(
  appReducer,
  {},
  composeEnhancers(middleware)
);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route name="App" path="/" onEnter={requireAuth} component={App}>
        <IndexRedirect to="/courses"/>
        <Route path="/courses" name="My Courses">
          <IndexRoute component={Courses}/>
          <Route path=":courseId" name="Course">
            <IndexRoute component={Course}/>
            <Route path="lecture/:lectureId" name="Lecture" prettifyParam={lectureNameToDateString}>
              <IndexRoute component={Lecture}/>
            </Route>
          </Route>
        </Route>
        <Route name="" path="/instructor-settings" component={InstructorSettings}/>
      </Route>
      <Route path="/login" component={Login}>
        <IndexRoute component={LoginIndex}/>
        <Route path="/reset" component={Reset}/>
        <Route path="/forgot" component={Forgot}/>
      </Route>
      <Route path="/logout" onEnter={logout}/>
    </Router>
  </Provider>
), mountNode);
