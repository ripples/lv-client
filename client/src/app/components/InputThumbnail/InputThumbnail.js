import React from "react";
import moment from "moment";
import "moment-duration-format";

class InputThumbnail extends React.Component {

  handleClickEvent(clickEvent) {
    clickEvent.preventDefault();
    console.log("clicked");
    this.props.onThumbnailClicked(this.props.timestamp);
  }

  render() {
    return (
      <div className="thumbnail">
        <div className="thumb">
          <img src={this.props.src} onClick={e => this.handleClickEvent(e)}/>
        </div>
        { moment.duration(this.props.timestamp * 1000).format("hh:mm:ss") }
      </div>
    );
  }
}

InputThumbnail.propTypes = {
  src: React.PropTypes.string,
  timestamp: React.PropTypes.number,
  onThumbnailClicked: React.PropTypes.func.isRequired
};

export default InputThumbnail;
