/*
 * LoginActions
 */

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {LoginConstants} from "../constants/LoginConstants";
import {login} from "../API";

export default class LoginActions {

  /**
   * Login to the system
   * @param  {object} data - login params
   */
  login(data) {
    login({
      data: data,
      success: data => {
        AppDispatcher.dispatch({
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
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGOUT
    });
  }
}
