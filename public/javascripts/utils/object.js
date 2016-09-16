"use strict";

/**
 * Deep clones anything
 * @param {*} any - anything
 * @return {*} new copy of any
 */
export function deepClone(any) {
  return JSON.parse(JSON.stringify(any));
}
