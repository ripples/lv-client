import React from "react";
import InstructorCourseList from "../../../components/InstructorCourseList/InstructorCourseList";
import {Link} from "react-router";

class InstructorSettings extends React.Component {
  render() {
    return (
      <div className="instructor-settings">
        <div className="my-courses">
        <Link to="/courses">My Courses</Link> <span>/</span>
        </div>
        <h1 className="course-options">Course Instructor Options</h1>
        <InstructorCourseList />
      </div>
    );
  }
}

export default InstructorSettings;
