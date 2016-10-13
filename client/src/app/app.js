"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";

import appReducer from "./reducers/app";

// core App component
import App from "./pages/App/App";

// ui demonstration component
import UI from "./pages/UI/ui";
import Login from "./pages/Login/Login";

const mountNode = document.getElementById("lvapp");
const store = createStore(
  appReducer,
  {},
  applyMiddleware(thunkMiddleware)
);

/* note: UI component will be used to develop/test our base styles, and will be removed before production */
render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/ui" component={UI}/>
      <Route path="/login" component={Login}/>
    </Router>
  </Provider>
), mountNode);
