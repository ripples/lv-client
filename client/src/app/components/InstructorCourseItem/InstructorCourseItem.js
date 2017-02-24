import React from "react";

class InstructorCourseItem extends React.Component {
  render() {
    return (
      <div className="instructor-course-item">
        <div className="rectangle-big">
          <div className="course-header">{this.props.data.title}</div>
          <div className="course-title">COURSE TITLE</div>
          <input name="course-title-text" type="text" placeholder={this.props.data.title}></input>
          <div className="course-description">COURSE DESCRIPTION</div>
          <textarea name="course-description-text" type="text"></textarea>
        </div>
      </div>
    );
  }
}

InstructorCourseItem.propTypes = {
  data: React.PropTypes.object
};

export default InstructorCourseItem;
