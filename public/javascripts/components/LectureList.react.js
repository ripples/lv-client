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
var MediaAction = require('../actions/MediaAction');
var MediaStore = require('../stores/MediaStore');
var MediaView = require('./MediaView.react');

var Lecture = React.createClass({
  onMediaChangeListener : function(){
    this.setState({dialogContent :
      this.generateMediaView({
            media : MediaStore.getCurrent(),
            primary : MediaStore.getPrimary()
      })
    });
  },
  generateMediaView : function(params){
    return(
      <MediaView media = {params.media}
        primary = {params.primary}></MediaView>
    )
  },
  getInitialState : function(){
    return{ dialogVisible : false,
            dialogContent : null };
  },
  focusLecture : function() {
    MediaAction.fetch();
    this.setState({dialogVisible : true});
  },
  unfocusLecture : function() {
    this.setState({dialogVisible : false});
  },
  componentDidMount : function(){
    MediaStore.addChangeListener(this.onMediaChangeListener);
  },
  componentWillUnmount : function(){
    MediaStore.removeChangeListener(this.onMediaChangeListener);
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
    var lectureNodes = this.props.lectures.map(function(obj, index){
    if (obj.display){
      return(
          <Lecture key={index} lecture = {obj}>
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
