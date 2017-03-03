import React from "react";
// import InstructorUserItem from "components/InstructorUserItem/InstructorUserItem";

class InstructorCourseItem extends React.Component {
  render() {
    return (
      <div className="instructor-course-item">
        <div className="rectangle-big">
          <div className="course-header">{this.props.data.title}</div>
          <div className="course-title">COURSE TITLE</div>
          <input name="course-title-text" type="text" placeholder={this.props.data.title}></input>
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
            <tr>
              <td>Douglas Gandle</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Cheyan Setayesh</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Dylan Fischer</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Mary Moser</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Douglas Gandle</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Cheyan Setayesh</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Dylan Fischer</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Mary Moser</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Douglas Gandle</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Cheyan Setayesh</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Dylan Fischer</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Mary Moser</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">REMOVE</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>Douglas Gandle</td>
              <td>
                <select>
                  <option value="administrator">Administrator</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </td>
              <td>
                <button className="remove-button">
                  <div className="remove-text">
                    <div className="remove-text">REMOVE</div>
                  </div>
                  </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

InstructorCourseItem.propTypes = {
  data: React.PropTypes.object
};

export default InstructorCourseItem;
