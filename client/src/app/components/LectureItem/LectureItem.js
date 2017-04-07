import React from "react";
import {Link} from "react-router";

/**
 * A thumbnail for a lecture
 */
class LectureItem extends React.Component {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="lecture-item">
        <Link to={`/courses/${this.props.courseId}/lecture/${this.props.lectureId}`}>
          <div className="thumbnail">
              {
                (this.props.justThumb) ? null : (
                  <div className="thumbnail-caption">
                    <h5>{(new Date(this.props.date * 1000)).toDateString()}</h5>
                  </div>
                )
              }
          </div>
        </Link>
      </div>
    );
  }

  /**
   * propTypes Declaration
   * @property {string} title The title of a lecture
   * @property {number} date The date of a lecture
   * @property {string} courseId UUID of the course that the lecture is from
   * @property {string} lectureId UUID of the lecture
   * @property {boolean} compact determines CSS tag to make
   * @property {boolean} justThumb determines if just the thumbnail or more detail will display
   */
  static get propTypes() {
    return {
      title: React.PropTypes.string,
      date: React.PropTypes.number,
      courseId: React.PropTypes.string,
      lectureId: React.PropTypes.string,
      compact: React.PropTypes.bool,
      justThumb: React.PropTypes.bool
    };
  }
}

export default LectureItem;
