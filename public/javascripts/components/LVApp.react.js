/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LoginStore and passes the new data to its children.
 */

import FeedSection from'./FeedSection.react';
import React from 'react';
import LoginStore from '../stores/LoginStore';

/**
 * Retrieve the current Login data from the LoginStore
 */
function getLoginState() {
    return {
        jwt: LoginStore.getJWT(),
        user: LoginStore.getUser()
    };
}

export default class LVApp extends React.Component {
    constructor() {
        super();
        this.state = getLoginState();
    }

    componentDidMount() {
        LoginStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange);
    }

    render() {
        if (LoginStore.isLoggedIn()) {
            return (
                <div>
                    <FeedSection jwt={this.state.jwt}/>
                </div>
            );
        }
        else {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }
    }

    /**
     * Event handler for 'change' events coming from the LoginStore
     */
    _onChange() {
        this.setState(getLoginState());
    }

}

