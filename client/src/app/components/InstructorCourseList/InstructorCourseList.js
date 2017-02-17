import React from "react";
import {connect} from "react-redux";
import {InstructorCourseItem} from "components/InstructorCourseItem/InstructorCourseItem";

class InstructorCourseList extends React.Component {
  getCourseLectures(lectureKeys) {
    // resolve lecture items by key
    // return lectureKeys.map(lectureKey => Object.assign({}, this.props.lectures[lectureKey], {lectureId: lectureKey}));
    return this.props.lectures.filter(lecture => lectureKeys.indexOf(lecture.lectureId) >= 0);
  }
  render() {
    return (
      <ul className="instructor-courselist">
        {this.props.courses.map((course, i) => {
          let lectures = this.getCourseLectures(course.lectures);
          return <li key={i}><InstructorCourseItem course-data={course}/></li>;
        })
        }
      </ul>
    );
  }
}

InstructorCourseList.propTypes = {
  courses: React.PropTypes.array
};

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

export default connect(mapStateToProps)(InstructorCourseList);
