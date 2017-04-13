import React from "react";

class ImageView extends React.Component {

  render() {
    return (
      <div>
        <div className="video-view">
          <img
            src={this.props.src}
            height={"358"}
            width={"638"}
          />
        </div>
    </div>
    );
  }
}

ImageView.propTypes = {
  src: React.PropTypes.string.isRequired
};

export default ImageView;
