/**
  * LectureList will have one sub-class of Lecture
  * This design will allow for the cascading of stateful class
  * information to update the views in LectureList, as well
  * as a searchbox, eventually.
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;

var Lecture = React.createClass({
  render : function() {
    return (
      <div className = "lectureContainer">
        <h3 className="lectureHeader">{this.props.lecturename}</h3>
      </div>
    )
  }
});

var LectureList = React.createClass({
  render : function(){
    var lectureNodes = this.props.lectures.map(function(obj){
      return(
        <Lecture lecturename = {obj.classname +" "+ obj.date}>
        </Lecture>
      )
    });
    return(
      <div className = "LectureList">
        {lectureNodes}
      </div>
    )
  }
});

module.exports = LectureList;
