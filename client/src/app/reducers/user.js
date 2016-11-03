"use strict";

import {DefaultState} from "../constants/StateConstants";

const user = (state = DefaultState.user, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default user;
