import React from "react";
import {Link} from "react-router";
import LectureItem from "components/LectureItem/LectureItem";

class LectureList extends React.Component {
  render() {
    const courseId = this.props.params.courseId;
    return (
      <div className="lecture-list">
        {
          (typeof this.props.course.lectures !== "undefined" && this.props.course.lectures !== null)
            ? Object.keys(this.props.course.lectures).map((lecture, i) => {
              return (
                <div className="lecture-row" key={i}>
                  <LectureItem
                    key={courseId + lecture}
                    courseId={courseId}
                    lectureId={lecture}
                    title={lecture}
                    date={this.props.course.lectures[lecture].timestamp}
                    compact={true}
                    justThumb={true}
                  />
                <div className="lecture-info">
                    <h5><Link to={`/courses/${courseId}/lecture/${lecture}`}>{lecture}</Link></h5>
                    <h6><Link to={`/courses/${courseId}/lecture/${lecture}`}> {
                        (new Date(this.props.course.lectures[lecture].timestamp)).toDateString()
                    } </Link></h6>
                    <h6><Link to={`/courses/${courseId}/lecture/${lecture}`}>{this.props.course.lectures[lecture].duration}</Link></h6>
                  </div>
                </div>
              );
            }) : null
        }
      </div>
    );
  }
}

LectureList.propTypes = {
  course: React.PropTypes.object.isRequired,
  params: React.PropTypes.object
};

export default LectureList;
