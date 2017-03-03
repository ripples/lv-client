import React from "react";
import InstructorCourseItem from "components/InstructorCourseItem/InstructorCourseItem";

class InstructorCourseList extends React.Component {
  render() {
    return (
      <ul className="instructor-courselist">
        {
          Object.keys(this.props.courses).map((key, i) => {
            return (
              <li key={i}>
                <InstructorCourseItem data={this.props.courses[key]}/>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

InstructorCourseList.propTypes = {
  courses: React.PropTypes.array
};

export default InstructorCourseList;
