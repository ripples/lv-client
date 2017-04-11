import React from "react";
import InstructorUserItem from "../../components/InstructorUserItem/InstructorUserItem";

class InstructorCourseItem extends React.Component {
  render() {
    var courseTitle = "raj";
    if (typeof this.props.data !== "undefined") {
      courseTitle = this.props.data.title;
    }
    return (
      <div className="instructor-course-item">
        <div className="rectangle-big">
          <div className="course-header">{courseTitle}</div>
          <div className="course-title">COURSE TITLE</div>
          <input name="course-title-text" type="text" placeholder={courseTitle}></input>
          <div className="enrolled-users">ENROLLED USERS
            <button className="add-users">
              <div className="add-users-text">Add Users</div>
            </button>
          </div>
          <InstructorUserItem />
        </div>
      </div>
    );
  }
}

InstructorCourseItem.propTypes = {
  data: React.PropTypes.object
};

export default InstructorCourseItem;
