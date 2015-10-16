/**
  * Module to contain the behavior for the "Feed" view
  * This will consist of :
  *   "LectureFeed" module to show all Lectures
  *   "ClassList" module to show classes, allowing to filter
**/


var React = require('react');
var ReactPropType = React.PropTypes;

var ClassList = require('./ClassList.react');
var LectureList = require('./LectureList.react');

var LectureConstants = require('../constants/LectureConstants');
var LectureStore = require('../stores/LectureStore');
var LectureActions = require('../actions/LectureAction');




var FeedSection = React.createClass({
  getInitialState : function(){
    return {lectures : [], classes : []};
  },
  onLectureChangeListener : function (){
    this.setState(
      {lectures : LectureStore.getLectures(),
        classes : LectureStore.getClasses()});
  },
  componentDidMount: function () {
    LectureStore.addChangeListener(this.onLectureChangeListener);
    LectureActions.fetch();
  },
  componentWillUnmount : function (){
    LectureStore.removeChangeListener(this.onLectureChangeListener);
  },
  render : function(){
    return (
      <div classname = "FeedViewWrapper">
        <ClassList classes = {this.state.classes} />
        <LectureList lectures = {this.state.lectures} />
      </div>
    );
  }
});


module.exports = FeedSection;
