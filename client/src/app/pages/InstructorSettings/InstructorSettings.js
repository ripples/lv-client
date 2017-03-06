import React from "react";
import InstructorCourseList from "../../components/InstructorCourseList/InstructorCourseList";

class InstructorSettings extends React.Component {
  render() {
    return (
      <div className="instructor-settings">
        <h1>Course Instructor Options</h1>
        <InstructorCourseList />
      </div>
    );
  }
}

export default InstructorSettings;
