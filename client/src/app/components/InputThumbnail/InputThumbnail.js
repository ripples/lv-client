import React from "react";
import {getCourses} from "../../libs/courses.js";
import moment from "moment";
import "moment-duration-format";

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
        <img className="thumb" src={this.props.src} onClick={e => this.handleClickEvent(e)}/>
        { moment.duration(this.props.timestamp * 1000).format("hh:mm:ss") }
      </div>
    );
  }
}

InputThumbnail.propTypes = {
  src: React.PropTypes.string,
  timestamp: React.PropTypes.number
};

export default InputThumbnail;
