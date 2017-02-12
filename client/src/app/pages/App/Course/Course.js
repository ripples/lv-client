import React from "react";
import {connect} from "react-redux";
import {Link} from 'react-router';

import LectureItem from "components/LectureItem/LectureItem";

class Course extends React.Component {
  render() {
    const courseId = this.props.params.courseId;

    return (
      <div className="course">
        <Link to="/courses">My Courses</Link> / <Link to={`/courses/${this.props.course.id}`}>{this.props.course.title.split(":")[0]}</Link>
        <h1>{this.props.course.title}</h1>

        {this.props.lectures.map((lecture, i) => {
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
