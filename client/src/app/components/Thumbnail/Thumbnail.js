import React from "react";
import moment from "moment";
import "moment-duration-format";

class Thumbnail extends React.Component {

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
        { moment.duration(this.props.timestamp * 1000).format("h:mm:ss", {trim: false}) }
      </div>
    );
  }
}

Thumbnail.propTypes = {
  src: React.PropTypes.string,
  timestamp: React.PropTypes.number,
  onThumbnailClicked: React.PropTypes.func.isRequired
};

export default Thumbnail;
