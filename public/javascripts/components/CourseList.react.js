"use strict";

/**
 * CourseList will have one sub-course of Course
 * This design will allow for the cascading of stateful course
 * information to update the view.
 **/

import React from "react";

import CourseCard from "./CourseCard.react";
import {Col} from "react-bootstrap";

export default class CourseList extends React.Component {
  render() {
    const courses = this.props.courses;
    const courseCards = Object.keys(courses).map((id, i) => {
      return (
        <CourseCard key={id} course={courses[id]}/>
      );
    });
    return (
      <Col sm={10} className="course-card">
        {courseCards}
      </Col>
    );
  }
}

CourseList.propTypes = {
  courses: React.PropTypes.any.isRequired
};

