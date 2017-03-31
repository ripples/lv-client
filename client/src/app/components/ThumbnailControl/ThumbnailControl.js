import React from "react";
import InputThumbnail from "../../components/InputThumbnail/InputThumbnail";

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
            return <InputThumbnail key={i} src={thumbnail.src} timestamp={thumbnail.timestamp}/>;
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
  }))
};

export default ThumbnailControl;
