import React from "react";
import InputThumbnail from "components/InputThumbnail/InputThumbnail";

class ThumbnailControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        "https://i.imgur.com/2KQ1vfG.png",
        "https://i.imgur.com/2KQ1vfG.png",
        "https://i.imgur.com/2KQ1vfG.png",
        "https://i.imgur.com/2KQ1vfG.png",
        "https://i.imgur.com/2KQ1vfG.png"
      ],
      number: 0};
  }
  render() {
    return (
      <div className="thumbnail-control">
        <div className="arrow">
          &lt;
        </div>
        {
          this.state.data.map(
            (e, i) => {
              return <InputThumbnail key={i} data={e}/>;
            }
          )
        }
        <div className="arrow">
          &gt;
        </div>
    </div>
    );
  }
}

ThumbnailControl.propTypes = {};

export default ThumbnailControl;
