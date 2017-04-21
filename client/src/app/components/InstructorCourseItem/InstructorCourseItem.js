import React from "react";
// import InstructorUserItem from "../../components/InstructorUserItem/InstructorUserItem";

class InstructorCourseItem extends React.Component {
  render() {
    var courseTitle = "raj";
    if (typeof this.props.course !== "undefined") {
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
              <th>USERS</th>
              <th>PRIVILEGE LEVEL</th>
              <th></th>
            </tr>
            {/*
              Object.keys(this.props.users).map((key, i) => {
                return (
                  <tr key={i}>
                    <InstructorUserItem user={this.props.users[key]}/>
                  </tr>
                );
              })
            */}
        </table>
        </div>
      </div>
    );
  }
}

InstructorCourseItem.propTypes = {
  course: React.PropTypes.object,
  users: React.PropTypes.array
};

export default InstructorCourseItem;
