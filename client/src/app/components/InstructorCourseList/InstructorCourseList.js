import React from "react";
import InstructorCourseItem from "components/InstructorCourseItem/InstructorCourseItem";

class InstructorCourseList extends React.Component {
  render() {
    return (
      <ul className="instructor-courselist">
        {
          Object.keys(this.props.courses).map(num => {
            return Object.keys(this.props.courses[num]).map((key, i) => {
              let o = this.props.courses[num][key];
              return (
                <li key={i}>
                  <InstructorCourseItem course={o}/>
                </li>
              );
            });
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
