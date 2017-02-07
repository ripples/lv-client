import React from "react";

class InputThumbnail extends React.Component {

  handleClickEvent(clickEvent, id) {
    clickEvent.preventDefault();
    console.log(id);
  }
  render() {
    return (
      <div className="thumbnail">
        <div className="thumb">
          <img src="https://i.imgur.com/4mXH4XM.jpg" onClick={(e, i) => this.handleClickEvent(e, i)}/>
        </div>
      </div>
    );
  }
}

InputThumbnail.propTypes = {};

export default InputThumbnail;
