"use strict";

import React from "react";

import courseAction from "../actions/CourseAction";
import {Button, ButtonGroup, Col} from "react-bootstrap";

import LectureCard from "./LectureCard";

export default class CourseCard extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.isDataFetched = false;
  }
  changeDisplay() {
    // TODO: Will be replaced by caching system
    if (!this.isDataFetched) { // only fetches the data once to avoid redundant requests
      this.fetchData();
    }
    this.setState({show: !this.state.show});
  }
  /**
   * fetch the lectures tho be displayed on the lecture card
   */
  fetchData() {
    const course = this.props.course;
    courseAction.fetchLectures(course.semester, course.id, Object.keys(course.lectures));
    courseAction.filter(this.props.course);
    this.isDataFetched = true;
  }
  
  render() {
    const course = this.props.course;
    const lectures = course.lectures;
    // map the lectures into lectureCards
    const lecturesCards = Object.keys(lectures).reduce((list, name) => {
      if (lectures[name]) {
        list.push(<LectureCard key={name} semester={course.semester} lecture={lectures[name]} courseId={course.id}/>);
      }
      return list;
    }, []);
    const cardsToDisplay = (this.state.show ? lecturesCards : []);
    const subtitle = (this.state.show ?
      <h3 className="text-center">Term: {course.semester} |
        Instructor: {course.prof} | {cardsToDisplay.length} Lectures </h3> : "");
    return (
      <Col sm={12} className="well">
        <div className="course-card">
          <ButtonGroup vertical block>
            <Button bsStyle="info" onClick={() => this.changeDisplay()}>
              {course.name}
              <span className="caret"/>
            </Button>
          </ButtonGroup>
          {subtitle}
          <Col sm={12}>
            {cardsToDisplay}
          </Col>
        </div>
      </Col>
    );
  }
}

CourseCard.propTypes = {
  course: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    semester: React.PropTypes.string.isRequired,
    lectures: React.PropTypes.object.isRequired
  }).isRequired
};
