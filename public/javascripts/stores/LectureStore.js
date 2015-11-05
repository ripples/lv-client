/*
 * LectureStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LectureConstants = require('../constants/LectureConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _classes = [];
var _lectures = [];

/**
 * Create the lectures array and classes array
 * @param  {array} lectures The array of lectures
 */
function set(lectures) {
  _classes = [];
  _lectures = lectures;
  _lectures.forEach(function(lecture) {
    // convert all raw dates to date Objects
    lecture.date = new Date(lecture.date);
    //make sure all are displayed
    lecture.display = true;
    //add all classes to the class list
    if(_classes.indexOf(lecture.course.title) === -1){
      _classes.push(lecture.course.title);
    }
  });
}

/**
 * Filter the lecture feed to display/not display a given class
 * @param  {string} classname The name of the class to filter in/out
 */
function filter(classname) {
  _lectures.forEach(function(lecture) {
    if(lecture.course.title === classname) {
      lecture.display = !lecture.display;
    }
  });
}

var LectureStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the lectures the user has access to
   * @return {array}
   */
  getLectures: function() {
    return _lectures;
  },

  /**
   * Get the classes the user has access to
   * @return {array}
   */
  getClasses: function() {
    return _classes;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case LectureConstants.FETCH:
      lectures = action.lectures;
      set(lectures);
      LectureStore.emitChange();
      break;

    case LectureConstants.FILTER:
      classname = action.classname.trim();
      filter(classname);
      LectureStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = LectureStore;
