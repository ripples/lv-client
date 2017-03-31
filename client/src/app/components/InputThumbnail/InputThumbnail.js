import React from "react";
import {getCourses} from "../../libs/courses.js";

class InputThumbnail extends React.Component {

  handleClickEvent(clickEvent) {
    clickEvent.preventDefault();
    // just getting testing ready
    getCourses().then(
      response => {
        console.log(response.data);
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <div className="thumbnail">
        <div className="thumb">
          <img src={this.props.src} onClick={e => this.handleClickEvent(e)}/>
        </div>
        {this.props.timestamp}
      </div>
    );
  }
}

InputThumbnail.propTypes = {
  src: React.PropTypes.string.isRequired,
  timestamp: React.PropTypes.number.isRequired
};

export default InputThumbnail;
