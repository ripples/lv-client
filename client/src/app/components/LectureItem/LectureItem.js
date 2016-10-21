import React from "react";
import {Link} from "react-router";

class LectureItem extends React.Component {
  render() {
    return (
      <div className="lecture-item">
        <Link to={`/courses/${this.props.courseId}/lecture/${this.props.lectureId}`}>
          <span className="thumbnail"></span>
          <h5>{this.props.title}</h5>
          <h6>{(new Date(this.props.date)).toDateString()}</h6>
        </Link>
      </div>
    );
  }
}

LectureItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.number.isRequired,
  courseId: React.PropTypes.string.isRequired,
  lectureId: React.PropTypes.string.isRequired
};

export default LectureItem;
