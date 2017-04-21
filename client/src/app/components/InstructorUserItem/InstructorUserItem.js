import React from "react";

class InstructorUserItem extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div className = "instructor-user-item">
          <td className = "student-name">{user.fname + " " + user.lname}</td>
          <td>
            <select>
              <option value="administrator">Administrator</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </td>
          <td className = "student-email">{user.email}</td>
          <td className="remove-button-width">
            <button className="remove-button">
              <div className="remove-text">REMOVE</div>
            </button>
          </td>
    </div>
    );
  }
}

InstructorUserItem.propTypes = {
  user: React.PropTypes.object
};

export default InstructorUserItem;
