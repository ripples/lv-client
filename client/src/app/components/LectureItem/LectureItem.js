import React from "react";

class LectureItem extends React.Component {
  render() {
    return (
      <div className="lecture-item">
        <span className="thumbnail"></span>
        <h5>{this.props.title}</h5>
        <h6>{(new Date(this.props.date)).toDateString()}</h6>
      </div>
    );
  }
}

LectureItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.number.isRequired
};

export default LectureItem;
