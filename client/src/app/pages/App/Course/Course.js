import React from "react";
import {connect} from "react-redux";

import LectureItem from "components/LectureItem/LectureItem";

class Course extends React.Component {
  render() {
    const courseId = this.props.params.courseId;

    return (
      <div className="course">
        <h1>{this.props.course.title}</h1>

        {this.props.lectures.map((lecture, i) => {
          return (
            <div key={i}>
              <LectureItem
                key={courseId + lecture.lectureId}
                courseId={courseId}
                lectureId={lecture.lectureId}
                title={lecture.title}
                date={lecture.date}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

Course.propTypes = {
  params: React.PropTypes.object,
  lectures: React.PropTypes.array.isRequired,
  course: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let course = state.courses.find(course => course.id === ownProps.params.courseId);
  let lectures = state.lectures.filter(lecture => course.lectures.indexOf(lecture.lectureId) >= 0);
  return {course, lectures};
};

export default connect(mapStateToProps)(Course);
