import React from "react";
import InstructorUserItem from "../../components/InstructorUserItem/InstructorUserItem";

class InstructorCourseItem extends React.Component {
  render() {
    const course = this.props.course;
    var courseTitle = "raj";
    if (typeof course !== "undefined") {
      courseTitle = this.props.course.title;
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
          <table className="users-list">
            <tr>
              <th className = "users-text">USERS</th>
              <th>PRIVILEGE LEVEL</th>
              <th>EMAIL</th>
              <th>REMOVE</th>
            </tr>
            <tr>
            {
              (typeof course.users === "undefined") ? null : course.users.map(user => {
                return (
                  <InstructorUserItem user={user} />
                );
              })
            }
            </tr>
        </table>
        </div>
      </div>
    );
  }
}

InstructorCourseItem.propTypes = {
  course: React.PropTypes.object
};

export default InstructorCourseItem;
