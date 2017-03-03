import React from "react";
import InstructorUserItem from "components/InstructorUserItem/InstructorUserItem";

class InstructorCourseItem extends React.Component {
  render() {
    return (
      <div className="instructor-course-item">
        <div className="rectangle-big">
          <div className="course-header">{this.props.data.title}</div>
          <div className="course-title">COURSE TITLE</div>
          <input name="course-title-text" type="text" placeholder={this.props.data.title}></input>
          <div className="enrolled-users">ENROLLED USERS</div>
          <table className="users-list">
            <tr>
              <th>USERS</th>
              <th>PRIVILEGE LEVEL</th>
              <th></th>
            </tr>
            {
              this.props.users.map((user, i) => {
                return <tr key={i}><InstructorUserItem userdata={user}/></tr>;
              })
            }
          </table>
        </div>
      </div>
    );
  }
}

InstructorCourseItem.propTypes = {
  data: React.PropTypes.object
};

InstructorCourseItem.propTypes = {
  users: React.PropTypes.object
};

export default InstructorCourseItem;
