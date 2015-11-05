/**
  * LectureView will allow a user to view a selected Lecture
  * It should REACT(lol) to an AppDispatcher dispatch, and will
  * disappear after the shading behind the box is clicked.
  *
  * Structure :
  * LectureView
  * - VidBox
  *   - LectureView
  *   - SlideView
  *   - BoardView
**/


var React = require('react');
var ReactPropTypes = React.PropTypes;

var LectureConstants = require('../constants/LectureConstants');
var LectureStore = require('../stores/LectureStore');
var LectureActions = require('../actions/LectureAction');

var BoardView = React.createClass({
  getInitialState : function(){
    return {buffer : {},
            images : {},
            time   : {}};
  },
  getImage : function(){
    //this.checkBuffer();
    return "BOARD GOES HERE";
  },
  render : function(){
    return (
      <div className = "boardContainer">
        {this.getImage()}
      </div>
    );
  }
});

var SlideView = React.createClass({
  getInitialState : function(){
    return {buffer : {},
            images : {},
            time   : {}};
  },
  getImage : function(){
    //this.checkBuffer();
    return "SLIDES GO HERE";
  },
  render : function(){
    return (
      <div className = "slideContainer">
        {this.getImage()}
      </div>
    );
  }
});

var LectureView = React.createClass({
  getInitialState : function(){
    return {buffer : {},
            images : {},
            time   : {}};
  },
  render : function(){
    return (
      <div className = "lectureViewContainer">
        "LECTURE GOES HERE"
      </div>
    );
  }
});

var VidBox = React.createClass({
  getInitialState : function(){
    return {buffer : {},
            images : {},
            time   : {}};
  },
  getImage : function(){
    //this.checkBuffer();
    return "BOARD GOES HERE";
  },
  render : function(){
    return (
      <div className = "vidBoxContainer">
        <BoardView />
        <SlideView />
        <LectureView />
      </div>
    );
  }
});

var LectureView = React.CreateClass({
  

});

module.exports = LectureView;
