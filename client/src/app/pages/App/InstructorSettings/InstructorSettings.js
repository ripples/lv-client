import React from "react";
import InstructorCourseList from "../../../components/InstructorCourseList/InstructorCourseList";
import {Link} from "react-router";

class InstructorSettings extends React.Component {
  render() {
    return (
      <div className="instructor-settings">
        <Link to="/courses">My Courses</Link> <span>/</span>
        <h1>Course Instructor Options</h1>
        <InstructorCourseList />
      </div>
    );
  }
}

export default InstructorSettings;
