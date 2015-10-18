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
      <div className="lectureContainer">
        <h4 className="lectureHeader">
          {this.props.lecture.course.title + " " + this.props.lecture.date.toLocaleDateString()}
        </h4>
      </div>
    )
  }
});

var LectureList = React.createClass({
  render : function(){
    var lectureNodes = this.props.lectures.map(function(obj){
    if (obj.display){
      return(
          <Lecture lecture = {obj}>
          </Lecture>
      )
    }
    else
      return(null);
    });
    return(
      <div className = "LectureList">
        {lectureNodes}
      </div>
    )
  }
});

module.exports = LectureList;
