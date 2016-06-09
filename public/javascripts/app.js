/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import ReactDom from 'react-dom';
import LVApp from './components/LVApp.react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';


import LoginSection from './components/LoginSection.react.js';

const app = document.getElementById('lvapp');

ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={LVApp}>
            <IndexRoute component={LoginSection}></IndexRoute>
        </Route>
    </Router>
    ,
    app
);
