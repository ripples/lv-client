"use strict";

/*
 * LoginActions
 */

import appDispatcher from "../dispatcher/AppDispatcher";
import {LoginConstants} from "../constants/LoginConstants";
import {login} from "../API";

class LoginActions {
  
  /**
   * Login to the system
   * @param  {object} data - login params
   */
  login(data) {
    login({
      data: data,
      callback: (err, data) => {
        if (err) {
          let message = String(err.err.message);
          AppDispatcher.dispatch({
            actionType: LoginConstants.ERROR,
            errorType: message
          });
        }
        appDispatcher.dispatch({
          actionType: LoginConstants.LOGIN,
          jwt: data.token
        });
      }
    });
  }
  
  /**
   * Logout of the system
   */
  logout() {
    appDispatcher.dispatch({
      actionType: LoginConstants.LOGOUT
    });
  }
}

const loginActions = new LoginActions();

export default loginActions;
