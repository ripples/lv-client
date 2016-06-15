"use strict";

import React from "react";

import courseAction from '../actions/CourseAction';

export default class ClassNode extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true
    };
  }

  changeDisplay() {
    courseAction.filter(this.props.classname);
    this.setState({show: !this.state.show});
  }

  render() {
    return (
      <div className="classContainer">
        <h5 className="classHeader">
          {this.props.classname}
        </h5>
        <span className="classShowSpan" onClick={this.changeDisplay}>
          {(this.state.show) ? "hide" : "show"}
        </span>
      </div>
    );
  }

}