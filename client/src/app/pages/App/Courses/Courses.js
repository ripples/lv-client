import React from "react";
import CourseList from "components/CourseList/CourseList";

class Courses extends React.Component {
  render() {
    return (
      <div className="courses">
        <h1>My Courses</h1>
        <CourseList />
      </div>
    );
  }
}

export default Courses;
