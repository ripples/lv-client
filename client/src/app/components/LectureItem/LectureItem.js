import React from "react";
import {Link} from "react-router";

class LectureItem extends React.Component {
  render() {
    return (
      <div className="lecture-item">
        <Link to={`/courses/${this.props.courseId}/lecture/${this.props.lectureId}`}>
          <div className="thumbnail">
            <div className="thumbnail-timestamp">
              <h5>00:00</h5>
            </div>
              <div className="thumbnail-caption">
                <h5>{(new Date(this.props.date * 1000)).toDateString()}</h5>
              </div>
          </div>
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
