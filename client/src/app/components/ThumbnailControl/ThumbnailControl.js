"use strict";

import React from "react";
import {connect} from "react-redux";
import {updateVideoTime} from "../../actions/media";
import Thumbnail from "../Thumbnail/Thumbnail";

class ThumbnailControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleArrowClick = this.handleArrowClick.bind(this);
  }

  handleArrowClick(clickEvent) {
    clickEvent.preventDefault();
    console.log("Clicked");
  }

  render() {
    return (
      <div className="thumbnail-control">
        <div className="leftarrow" onClick={this.handleArrowClick}>
          &lt;
        </div>
        {
          this.props.thumbnails.map((thumbnail, i) => {
            return (
              <Thumbnail
                key={`${thumbnail.timestamp}${i}`}
                src={thumbnail.src}
                timestamp={thumbnail.timestamp}
                onThumbnailClicked={this.props.updateVideoTime}
              />);
          })
        }
        <div className="rightarrow" onClick={this.handleArrowClick}>
          &gt;
        </div>
      </div>
    );
  }
}

ThumbnailControl.propTypes = {
  thumbnails: React.PropTypes.arrayOf(React.PropTypes.shape({
    src: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.number.isRequired,
    index: React.PropTypes.number
  })).isRequired,
  updateVideoTime: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    updateVideoTime: newTime => dispatch(updateVideoTime(newTime))
  };
}

export default connect(null, mapDispatchToProps)(ThumbnailControl);
