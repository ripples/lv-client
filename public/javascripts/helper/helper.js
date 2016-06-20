"use strict";
import loginStore from "../stores/LoginStore";

export function loginCheck(nextState, replace) {
  if (!loginStore.isLoggedIn()) {
    replace("/login");
  }
}
export function logoutCheck(nextState, replace) {
  if (loginStore.isLoggedIn()) {
    replace("/");
  }
}

/*
export function * makeIterable() {
  let properties = Object.keys(this);
  for (let p of properties) {
    yield this[p];
  }
}*/
