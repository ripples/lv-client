"use strict";

import {DefaultState} from "../constants/StateConstants";
import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from "../actions/user";

const user = (state = DefaultState.user, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        token: null,
        error: action.payload.error
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.payload.token,
        error: null
      });
    case LOGOUT:
      return Object.assign({}, state, {
        token: null,
        error: null
      });
    default:
      return state;
  }
};

export default user;
