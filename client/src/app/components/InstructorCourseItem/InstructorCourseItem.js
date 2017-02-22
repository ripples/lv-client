import React from "react";

class InstructorCourseItem extends React.Component {
  render() {
    var textbox = {
      width: 600,
      height: 149
    };
    return (
      <div className="instructor-course-item">
        <div className="rectangle-big">
          <div className="course-header">{this.props.data.title}</div>
          <div className="course-title">COURSE TITLE</div>
          <textarea type="text" placeholder={this.props.data.title}></textarea>
          <div className="course-description">COURSE DESCRIPTION</div>
          <textarea type="text" style={textbox}></textarea>
        </div>
      </div>
    );
  }
}

InstructorCourseItem.propTypes = {
  data: React.PropTypes.object
};

export default InstructorCourseItem;
