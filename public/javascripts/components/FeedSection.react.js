/**
  * Module to contain the behavior for the "Feed" view
  * This will consist of :
  *   "LectureFeed" module to show all Lectures
  *   "ClassList" module to show classes, allowing to filter
  *   "LectureView" module to view individual lectures
**/


import React from 'react';
var ReactPropType = React.PropTypes;

import ClassList from './ClassList.react';
import LectureList from './LectureList.react';

import LectureConstants from '../constants/LectureConstants';
import LectureStore from '../stores/LectureStore';
import LectureActions from '../actions/LectureAction';

export default class FeedSection extends React.Component{
  constructor(){
    super();
    this.state = {lectures : [], classes : []};
  }

  onLectureChangeListener(){
    this.setState(
        {lectures : LectureStore.getLectures(),
          classes : LectureStore.getClasses()});
  }

  componentDidMount () {
    LectureStore.addChangeListener(this.onLectureChangeListener);
    LectureActions.fetch(this.props.jwt);
  }

  componentWillUnmount(){
    LectureStore.removeChangeListener(this.onLectureChangeListener);
  }

  render(){
    return (
        <div className = "FeedViewWrapper">
          <ClassList classes = {this.state.classes} />
          <LectureList lectures = {this.state.lectures} />
        </div>
    );
  }
}


