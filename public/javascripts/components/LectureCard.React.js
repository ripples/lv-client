"use strict";

import React from "react";

export default class LectureCard extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true
    };
  }

  render() {
    if (!this.state.show) {
      return;
    }
    return (
      <div>
        <h5>
          {JSON.stringify(this.props.lecture)}
        </h5>
      </div>
    );
  }
}
