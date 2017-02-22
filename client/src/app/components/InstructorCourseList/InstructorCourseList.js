import React from "react";
import InstructorCourseItem from "components/InstructorCourseItem/InstructorCourseItem";

class InstructorCourseList extends React.Component {
  render() {
    return (
      <ul className="instructor-courselist">
        {
          this.props.courses.map((course, i) => {
            return <li key={i}><InstructorCourseItem data={course}/></li>;
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
