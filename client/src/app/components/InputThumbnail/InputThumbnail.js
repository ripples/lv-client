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
          <img src={this.props.image} onClick={(e, i) => this.handleClickEvent(e, i)}/>
        </div>
        {this.props.time}
      </div>
    );
  }
}

InputThumbnail.propTypes = {
  image: React.PropTypes.string,
  time: React.PropTypes.number
};

export default InputThumbnail;
