/*
 * LectureActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var LectureConstants = require('../constants/LectureConstants');
var api = require('../API.js');

var LectureActions = {

  /**
   * Create the lectures array and classes array
   */
  fetch: function() {
    api.fetchLectures({
      success : function(lectures){
        AppDispatcher.dispatch({
          actionType: LectureConstants.FETCH,
          lectures: lectures
        });
      }
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
  },

  /**
   * Launch LectureView component
   * @param {TODO:MAKESCHEMA} lecture object
   */
  view: function(lecture) {
     AppDispatcher.dispatch({
       actionType: LectureConstants.VIEW,
       lecture : lecture
     });
   },

   /**
    * Hide LectureView component
    */
  hide: function(){
    AppDispatch.dispatch({
      actionType: LectureConstants.HIDE,
    });
  },
};

module.exports = LectureActions;
