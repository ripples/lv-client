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
      var widthPercent= Math.floor((100/elem.length)).toString() + "%";
      var style = {"width" : widthPercent, "height" : "100%", "float" : "left"};
      return elem.map(function(mediaObj, index){
        return(
          <div key={index} style={style}>
            <MediaComponent media={mediaObj}></MediaComponent>
          </div>
        )
      });
    }
    else {
      if (this.elem)
      return (
        <div style={{"width" : "100%",
          "height":"20%", "align" : "center"}}>
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
      <div className = "MainMediaWrapper">
        <div classsName = "PrimaryMedia">
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
      <div className = "MediaView">
        <MainMediaContainer
          MainMedia = {MediaCopy.splice(this.props.primary, 1)[0]}
          LowerMedia = {MediaCopy}
          ></MainMediaContainer>
      </div>
    );
  }
});

module.exports = MediaView;
