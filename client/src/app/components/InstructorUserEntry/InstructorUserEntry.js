import React from "react";

class InstructorUserEntry extends React.Component {
  render() {
    return (
      <div>
        <tr>
          <td>Douglas Gandle</td>
          <td>
            <select>
              <option value="administrator">Administrator</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </td>
          <td className="remove-button-width">
            <button className="remove-button">
              <div className="remove-text">REMOVE</div>
            </button>
          </td>
      </tr>
    </div>
    );
  }
}

export default InstructorUserEntry;
