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
          <img src={this.props.image} onClick={e => this.handleClickEvent(e)}/>
        </div>
        {this.props.time}
      </div>
    );
  }
}

InputThumbnail.propTypes = {
  image: React.PropTypes.string,
  time: React.PropTypes.string
};

export default InputThumbnail;
