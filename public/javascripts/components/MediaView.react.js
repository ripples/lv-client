/**
  * LectureView will allow a user to view a selected Lecture
  * It should REACT(lol) to an AppDispatcher dispatch, and will
  * disappear after the shading behind the box is clicked.
  *
**/


var React = require('react');
var ReactPropTypes = React.PropTypes;

var MediaComponent = require('./MediaComponent.react');

var LowerMediaContainer = React.createClass({
  build : function(elem){
    if (elem.map){ // check if an array was passed
      var percentage = (100/elem.length).toString() + "%";
      return elem.map(function(mediaObj){
        return(
          <div width={percentage} height="20%">
            <MediaComponent media={mediaObj}></MediaComponent>
          </div>
        )
      });
    }
    else {
      if (this.elem)
      return (
        <div width="100%">
          <MediaComponent media ={elem}></MediaComponent> // return the one element passed
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
      <div width ="100%">
        <div className = "UpperMediaContainer" width="100%">
          <div width = "100%">
          <MediaComponent media = {this.props.MainMedia}></MediaComponent>
          </div>
        </div>
        <LowerMediaContainer elements = {this.props.LowerMedia}></LowerMediaContainer>
      </div>
    );
  }
});

var MediaView = React.createClass({
  render : function(){
    var MediaCopy = this.props.media.slice();
    return(
      <div className = "MediaView" position="relative" width = "80%" height="100%">
        <MainMediaContainer
          MainMedia = {MediaCopy.splice(this.props.primary, 1)[0]}
          LowerMedia = {MediaCopy}
          ></MainMediaContainer>
      </div>
    );
  }
});

module.exports = MediaView;
