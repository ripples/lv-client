"use strict";

import React from "react";
import InputThumbnail from "../../components/InputThumbnail/InputThumbnail";
import {updateVideoTimeAction} from "../../libs/actions";
import {connect} from "react-redux";

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
        <div className="arrow" onClick={this.handleArrowClick}>
          &lt;
        </div>
        {
          this.props.thumbnails.map((thumbnail, i) => {
            return (
              <InputThumbnail
                key={`${thumbnail.timestamp}${i}`}
                src={thumbnail.src}
                timestamp={thumbnail.timestamp}
                onThumbnailClicked={this.props.updateVideoTime}
              />);
          })
        }
        <div className="arrow" onClick={this.handleArrowClick}>
          &gt;
        </div>
    </div>
    );
  }
}

ThumbnailControl.propTypes = {
  thumbnails: React.PropTypes.arrayOf(React.PropTypes.shape({
    src: React.PropTypes.string,
    timestamp: React.PropTypes.number
  })),
  updateVideoTime: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    updateVideoTime: newTime => dispatch(updateVideoTimeAction(newTime))
  };
}

export default connect(null, mapDispatchToProps)(ThumbnailControl);
