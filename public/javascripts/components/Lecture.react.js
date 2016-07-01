"use strict";

import React from "react";

import DialogBox from "./DialogBox.react";
import mediaActions from "../actions/MediaAction";
import mediaStore from "../stores/MediaStore";
import MediaView from "./MediaView.react";

export default class Lecture extends React.Component {
  onMediaChangeListener() {
    this.setState({
      dialogContent: this.generateMediaView({
        media: mediaStore.getCurrent(),
        primary: mediaStore.getVideoData()
      })
    });
  }

  generateMediaView(params) {
    return (
      <MediaView media={params.media}
                 primary={params.primary}/>
    );
  }

  constructor() {
    super();
    this.state = {
      dialogVisible: false,
      dialogContent: null
    };
  }

  focusLecture() {
    mediaActions.fetch();
    this.setState({dialogVisible: true});
  }


  unfocusLecture() {
    this.setState({dialogVisible: false});
  }


  componentDidMount() {
    mediaStore.addChangeListener(this.onMediaChangeListener);
  }


  componentWillUnmount() {
    mediaStore.removeChangeListener(this.onMediaChangeListener);
  }


  render() {
    return (
      <div className="lectureContainer">
        <h4 className="lectureHeader">
          {this.props.lecture.course + " " + this.props.lecture.date.toLocaleDateString()}
        </h4>
        <span className="lectureDialogShowSpan" onClick={this.focusLecture}>
          view
        </span>
        <DialogBox visible={this.state.dialogVisible}
                   requestClose={this.unfocusLecture}
                   content={this.state.dialogContent}/>
      </div>
    );
  }
}