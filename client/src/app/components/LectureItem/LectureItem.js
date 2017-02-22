import React from "react";
import {Link} from "react-router";

class LectureItem extends React.Component {
  render() {
    return (
      <div className={`lecture-item ${this.props.compact ? "compact" : ""}`}>
        <Link to={`/courses/${this.props.courseId}/lecture/${this.props.lectureId}`}>
          <span>
            <span className="thumbnail"></span>
              {
                (this.props.justThumb) ? null : (
                  <div>
                    <h5>{this.props.title}</h5>
                    <h6>{(new Date(this.props.date)).toDateString()}</h6>
                  </div>
                )
              }
          </span>
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
  compact: React.PropTypes.bool,
  justThumb: React.PropTypes.bool
};

export default LectureItem;
