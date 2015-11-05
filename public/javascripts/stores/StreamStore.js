/*
 * StreamStore holds paramaters for actually viewing a Lecture
 *
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var StreamConstants = require('../constants/StreamConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _slides = [];
var _boards = [];
var _video = "";


/**
  * update the slides Object in the store.
  * @param slides the new array containing slide objects
  */
function setSlides(slides){
  _slides = slides;
}

/**
  * update the boards Object in the store.
  * @param boards the new array containing board objects
  */
function setBoards(boards){
  _boards = boards;
}

/**
  * update the video Object in the store.
  * @param video the new array containing video objects
  */
function setVideo(boards){
  _video = video;
}

var StreamStore = assign({}, EventEmitter.prototype, {
  /**
    * access the most recently loaded board images
    * @return {array} recently loaded board images
    */
  getBoards : function(){
    return _boards;
  },

  /**
    * access the most recently loaded slide images
    * @return {array} recently loaded slide images
    */
  getSlides : function(){
    return _slides;
  },

  /**
    * access the most recently loaded video URL
    * @return {array} recently loaded video url
    */
  getVideoURL : function(){
    return _video;
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


AppDispatcher.register(function(action){
  switch(action.actionType){
    case StreamConstants.BOARDS:
      boards = action.boards;
      setBoards(boards);
      StreamStore.emitChange();
      break;
    case StreamConstants.SLIDES:
      slides = action.slides;
      setSlides(slides);
      StreamStore.emitChange();
      break;
    case StreamConstants.VIDEO:
      video = action.video.trim();
      setVideo(video);
      break;
    default:
  }
});

module.exports = StreamStore;
