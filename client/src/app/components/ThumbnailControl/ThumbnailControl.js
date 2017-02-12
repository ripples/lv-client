import React from "react";
import InputThumbnail from "components/InputThumbnail/InputThumbnail";

const placeholderData = () => {
  return {
    image: "https://i.imgur.com/4mXH4XM.jpg",
    time: "00:0"
  };
};

class ThumbnailControl extends React.Component {
  constructor(props) {
    super(props);
    let x = [];
    for (let c = 0; c < 5; c++) {
      x[c] = placeholderData();
      x[c].time += c;
    }
    this.state = {
      data: x
    };
  }

  handleArrowClick(clickEvent) {
    clickEvent.preventDefault();
    console.log("Clicked");
  }

  render() {
    return (
      <div className="thumbnail-control">
        <div className="arrow" onClick={e => this.handleArrowClick(e)}>
          &lt;
        </div>
        {
          this.state.data.map(
            (e, i) => {
              return <InputThumbnail key={i} image={e.image} time={e.time}/>;
            }
          )
        }
        <div className="arrow" onClick={e => this.handleArrowClick(e)}>
          &gt;
        </div>
    </div>
    );
  }
}

ThumbnailControl.propTypes = {};

export default ThumbnailControl;
