"use strict";

import React from "react";

import CourseCard from "./CourseCard";

export default class CourseList extends React.Component {
  render() {
    const courses = this.props.courses;
    const courseCards = Object.keys(courses).map(id => {
      return (
        <CourseCard key={id} course={courses[id]}/>
      );
    });
    return (
      <div className="course-card col-sm-10">
        {courseCards}
      </div>
    );
  }
}

CourseList.propTypes = {
  courses: React.PropTypes.object.isRequired
};
