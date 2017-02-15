"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRedirect} from "react-router";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";

import appReducer from "./reducers/app";

// utilities
import {logout, requireAuth} from "./libs/auth";
import {configureAxios} from "./libs/api";

// core App component
import App from "./pages/App/App";
import Courses from "./pages/App/Courses/Courses";
import Course from "./pages/App/Course/Course";
import Lecture from "./pages/App/Lecture/Lecture";
import Login from "./pages/Login/Login";

// Configure globals
configureAxios();

// TODO: wrap in dev env var
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const mountNode = document.getElementById("lvapp");
const store = createStore(
  appReducer,
  {},
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

/* note: UI component will be used to develop/test our base styles, and will be removed before production */
render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={requireAuth} component={App}>
        <IndexRedirect to="/courses" />
        <Route path="/courses" component={Courses} />
        <Route path="/courses/:courseId" component={Course}/>
        <Route path="/courses/:courseId/lecture/:lectureId" component={Lecture}/>
      </Route>
      <Route path="/login" component={Login}/>
      <Route path="/reset" component={Login}/>
      <Route path="/logout" onEnter={logout}/>
    </Router>
  </Provider>
), mountNode);
