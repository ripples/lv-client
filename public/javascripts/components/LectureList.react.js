/**
  * LectureList will have one sub-class of Lecture
  * This design will allow for the cascading of stateful class
  * information to update the views in LectureList, as well
  * as a searchbox, eventually.
  *
  * This class also implements the use of DialogBox for viewing
  * Lectures.
  *
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;
var DialogBox = require('./DialogBox.react');

var Lecture = React.createClass({
  getInitialState : function(){
    return{ dialogVisible : false,
            dialogContent : null };
  },
  focusLecture : function() {
    this.setState({dialogVisible : true});
  },
  unfocusLecture : function() {
    this.setState({dialogVisible : false});
  },
  render : function() {
    return (
      <div className="lectureContainer">
        <h4 className="lectureHeader">
          {this.props.lecture.course.title + " " + this.props.lecture.date.toLocaleDateString()}
        </h4>
        <span className="lectureDialogShowSpan" onClick={this.focusLecture}>
          view
        </span>
        <DialogBox visible = {this.state.dialogVisible}
          requestClose = {this.unfocusLecture}
          content = {this.state.dialogContent}></DialogBox>
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
