import React from "react";

class ImageView extends React.Component {

  render() {
    return (
      <div>
        <div className="video-view">
          {this.props.imageSrc ?
            <img
              src={this.props.imageSrc}
              height={"358"}
              width={"638"}
            />
            : "No Image Found" }
        </div>
    </div>
    );
  }
}

ImageView.propTypes = {
  imageSrc: React.PropTypes.string
};

export default ImageView;
