import React from "react";

import CourseList from "./../../../components/CourseList/CourseList";
// import {getCourses} from "."
// getCourses will callback, dispatch to redux, pass to redux state thingy, pull data from state and pass down to whatever needs the data

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
