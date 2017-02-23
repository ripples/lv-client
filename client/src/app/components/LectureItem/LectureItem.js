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
                    <h6>{(new Date(this.props.date * 1000)).toDateString()}</h6>
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
  title: React.PropTypes.string,
  date: React.PropTypes.number,
  courseId: React.PropTypes.string,
  lectureId: React.PropTypes.string,
  compact: React.PropTypes.bool,
  justThumb: React.PropTypes.bool
};

export default LectureItem;
