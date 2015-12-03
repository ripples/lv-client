/**
  * LectureView will allow a user to view a selected Lecture
  * It should REACT(lol) to an AppDispatcher dispatch, and will
  * disappear after the shading behind the box is clicked.
  *
**/


var React = require('react');
var ReactPropTypes = React.PropTypes;

var LectureConstants = require('../constants/LectureConstants');
var LectureStore = require('../stores/MediaStore');
var LectureActions = require('../actions/MediaAction');

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

var LowerMediaContainer = React.createClass({
  build : function(elem){
    if (elem.map){ // check if an array was passed
      var percentage = (100/elem.length).toString() + "%";
      return elem.map(function(obj){
        return(
          <div width={percentage}>
            {obj.component} // iterate through components to show all equally.
          </div>
        )
      });
    }
    else {
      if (this.elem)
      return (
        <div width="100%">
          {elem.component} // return the one element passed
        </div>
      )
      else {
        return null; // return nothing, there is nothing to show.
      }
    }
  },
  render : function(){
    return(
      <div className = "LowerMediaContainer">
        {this.build(this.props.elements)}
      </div>
    )
  }
});

var MainMediaContainer = React.createClass({
  render : function(){
    return (
      <div className = "vidBoxContainer">
        <div className = "UpperMediaContainer">
          {this.props.MainMedia}
        </div>
        <LowerMediaContainer elements = {this.props.LowerMedia}></LowerMediaContainer>
      </div>
    );
  }
});

var MediaView = React.CreateClass({
  getInitialState : function(){
    /*
     Initally set the focused element to whatever is
     first in the array given.
    */
    this.setState({MainElement : 0});
  },
  render : function(){
    var MediaCopy = this.props.Media;
    return(
      <div className = "MediaView">
        <MainMediaContainer
          MainMedia = {MediaCopy.splice(this.MainElement, 1)}
          LowerMediaContainer = {MediaCopy}
          ></MainMediaContainer>
      </div>
    );
  }
});

module.exports = LectureView;
