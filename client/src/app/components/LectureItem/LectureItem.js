import React from "react";
import {Link} from "react-router";

class LectureItem extends React.Component {
  render() {
    return (
      <div className={`lecture-item ${this.props.compact ? "compact" : ""}`}>
        <Link to={`/courses/${this.props.courseId}/lecture/${this.props.lectureId}`}>
          {
            (this.props.compact) ?
              <span>
                <span className="thumbnail"></span>
                <h5>{this.props.title}</h5>
                <h6>{(new Date(this.props.date)).toDateString()}</h6>
              </span>
              :
              <span>
                <span className="thumbnail"></span>
                <h5>{this.props.title}</h5>
                <h6>{(new Date(this.props.date)).toDateString()}</h6>
              </span>
          }
        </Link>
      </div>
    );
  }
}

LectureItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.number.isRequired,
  courseId: React.PropTypes.string.isRequired,
  lectureId: React.PropTypes.string.isRequired,
  compact: React.PropTypes.bool
};

export default LectureItem;
