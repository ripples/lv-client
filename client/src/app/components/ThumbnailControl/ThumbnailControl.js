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

  handleArrowClick(clickEvent) {
    clickEvent.preventDefault();
    console.log("Clicked");
  }
  /* handleClickEvent(clickEvent, id) {
    clickEvent.preventDefault();
    console.log(id);
  }*/
  render() {
    return (
      <div className="thumbnail-control">
        <div className="arrow" onClick={e => this.handleArrowClick(e)}>
          &lt;
        </div>
        {
          this.state.data.map(
            (e, i) => {
              return <InputThumbnail key={i} data={e}/>;
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
