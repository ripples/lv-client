"use strict";

import React from "react";

import CourseCard from "./CourseCard";
import {Col} from "react-bootstrap";

export default class CourseList extends React.Component {
  render() {
    const courses = this.props.courses;
    const courseCards = Object.keys(courses).map(id => {
      return (
        <CourseCard key={id} course={courses[id]}/>
      );
    });
    return (
      <Col sm={9} className="course-card">
        {courseCards}
      </Col>
    );
  }
}

CourseList.propTypes = {
  courses: React.PropTypes.object.isRequired
};
