"use strict";

/**
 * Changes in this enum MUST be reflected in the table user_types in the database
 * @type {{ADMIN: number, STUDENT: number, PROFESSOR: number}}
 */
export const UserTypesEnum = {
  ADMIN: 1,
  STUDENT: 2,
  PROFESSOR: 3
};

/**
 * StateConstants
 * this needs to be wiped to {} once we actually hook into the db
 */
export const DefaultState = {
  user: {},
  courses: {
    ...Object.keys(UserTypesEnum).reduce((result, userTypeid) => {
      result[UserTypesEnum[userTypeid]] = {};
      return result;
    }, {})
  },
  media: {}
};
