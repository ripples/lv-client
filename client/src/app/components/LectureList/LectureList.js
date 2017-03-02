import React from "react";
import {Link} from "react-router";
import LectureItem from "components/LectureItem/LectureItem";

class LectureList extends React.Component {
  render() {
    const courseId = this.props.params.courseId;
    return (
      <div>
        {this.props.course.lectures.map((lecture, i) => {
          return (
            <div className="lecture-row" key={i}>
              <LectureItem
                key={courseId + lecture.lectureId}
                courseId={courseId}
                lectureId={lecture.lectureId}
                title={lecture.title}
                date={lecture.date}
                compact={true}
                justThumb={true}
              />
            <div className="lecture-info">
                <h5><Link to={`/courses/${courseId}/lecture/${lecture.lectureId}`}>{lecture.title}</Link></h5>
                <h6><Link to={`/courses/${courseId}/lecture/${lecture.lectureId}`}>{(new Date(lecture.date)).toDateString()}</Link></h6>
                <h6><Link to={`/courses/${courseId}/lecture/${lecture.lectureId}`}>TIME</Link></h6>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

LectureList.propTypes = {
  course: React.PropTypes.object.isRequired,
  params: React.PropTypes.object
};

export default LectureList;
