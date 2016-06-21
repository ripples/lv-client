"use strict";

import React from "react";
import courseAction from "../actions/CourseAction";
import LectureCard from "./LectureCard.React";
import Chance from "chance";
//import dateFormat from 'dateformat';
const chance = new Chance();

export default class CourseCard extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.isDataFetched = false;
  }

  changeDisplay() {
    if (!this.isDataFetched) {
      this.fetchData();
    }
    this.setState({show: !this.state.show});
  }

  fetchData() {
    const course = this.props.course;
    courseAction.fetchLectures(course.id, Object.keys(course.lectures));
    courseAction.filter(this.props.course);
  }

  render() {
    const course = this.props.course;
    // TODO: figure out why render is called twice, this is happens throughout all react components,
    // I'm not sure if this is just part of react or because we're using the lifecycle incorrectly
    const lectures = course.lectures;
    const lecturesCards = Object.keys(lectures).reduce((list, id, i) => {
      if (lectures[id]) {
        list.push(<LectureCard key={chance.integer()} lecture={lectures[id]}/>);
      }
      return list;
    }, []);
    const cardsToDisplay = (this.state.show ? lecturesCards : []);
    const subtitle = (this.state.show ?
      <h3 className="text-center">Term: {course.startDtm} |
        Instructor: {course.prof} | {cardsToDisplay.length} Lectures </h3> : "");
    return (
      <div className="col-sm-12">
        <div className="course-card">
          <a className="btn btn-info" onClick={() => this.changeDisplay()}>
            {course.name}
          </a>
          {subtitle}
          <div className="col-sm-12">
            {cardsToDisplay}
          </div>
        </div>
      </div>
    );
  }
}

CourseCard.propTypes = {
  course: React.PropTypes.any.isRequired
};
