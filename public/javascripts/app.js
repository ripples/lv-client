"use strict";

import React from "react";
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";

import appReducer from "./reducers/appReducer";

const mountNode = document.getElementById("lvapp");

let store = createStore(
  appReducer,
  {},
  applyMiddleware(thunkMiddleware)
);

render((
  <Provider store={store}>
  </Provider>
), mountNode);
