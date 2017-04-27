import React from "react";

class ImageView extends React.Component {

  render() {
    return (
      <img className="image-view"
          src={this.props.src}
      />
    );
  }
}

ImageView.propTypes = {
  src: React.PropTypes.string.isRequired
};

export default ImageView;
