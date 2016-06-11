"use strict";

/*
 * LectureStore
 */

import EventEmitter from "events";

import {dispatcher as AppDispatcher} from "../dispatcher/AppDispatcher";
import {LectureConstants} from "../constants/LectureConstants";

const CHANGE_EVENT = "change";

let _classes = [];
let _lectures = [];

/**
 * Create the lectures array and classes array
 * @param  {array} lectures The array of lectures
 */
function set(lectures) {
  _classes = [];
  _lectures = lectures;
  _lectures.forEach(lecture => {
    // convert all raw dates to date Objects
    lecture.date = new Date(lecture.date);
    // make sure all are displayed
    lecture.display = true;
    // add all classes to the class list
    if (_classes.indexOf(lecture.course) === -1) {
      _classes.push(lecture.course);
    }
  });
}

/**
 * Filter the lecture feed to display/not display a given class
 * @param  {string} classname The name of the class to filter in/out
 */
function filter(classname) {
  _lectures.forEach(function(lecture) {
    if (lecture.course === classname) {
      lecture.display = !lecture.display;
    }
  });
}

class LectureStore extends EventEmitter {

  /**
   * Get the lectures the user has access to
   * @return {array} - lectures list
   */
  getLectures() {
    return _lectures;
  }

  /**
   * Get the classes the user has access to
   * @return {array} - classes list
   */
  getClasses() {
    return _classes;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback - called on event change
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback - to be removed from event
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case LectureConstants.FETCHLECTURES: {
      const lectures = action.lectures;
      set(lectures);
      LectureStore.emitChange();
      break;
    }
    case LectureConstants.FILTER: {
      const classname = action.classname.trim();
      filter(classname);
      LectureStore.emitChange();
      break;
    }
    default:
      // no op
  }
});

const lectureStore = new LectureStore();

export default lectureStore;
