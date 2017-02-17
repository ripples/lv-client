import React from "react";

class InstructorCourseItem extends React.Component {
  render() {
    return (
      <div className="instructor-course-item">
        <div className="rectangle-big">
          <h1 className="course-header">{this.props["course-data"].title}</h1>
          <h1 className="course-title">COURSE TITLE</h1>
          <div className="course-title-input">
            <h1 className="course-title-text">{this.props["course-data"].title}</h1>
          </div>
          <h1 className="course-description">COURSE DESCRIPTION</h1>
          <div className="course-description-textbox"></div>
    );
  }
}

InstructorCourseItem.propTypes = {
  "course-data": React.PropTypes.object.isRequired, // TODO: define shape
};
