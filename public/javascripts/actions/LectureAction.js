/*
 * LectureActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var LectureConstants = require('../constants/LectureConstants');

var LectureActions = {

  /**
   * Create the lectures array and classes array
   * @param  {array} lectures The array of lectures
   */
  set: function(lectures) {
    AppDispatcher.dispatch({
      actionType: LectureConstants.SET,
      lectures: lectures
    });
  },

  /**
   * Filter the lecture feed to display/not display a given class
   * @param  {string} classname The name of the class to filter in/out
   */
  filter: function(classname) {
    AppDispatcher.dispatch({
      actionType: LectureConstants.FILTER,
      classname: classname
    });
  }

};

module.exports = LectureActions;
