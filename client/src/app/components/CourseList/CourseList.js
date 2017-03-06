import React from "react";
import CourseItem from "../../components/CourseItem/CourseItem";

class CourseList extends React.Component {
  render() {
    return (
        <ul className="course-list">
          {
            Object.keys(this.props.courses).map((key, i) => {
              return (
                <li key={i}>
                  <CourseItem course={this.props.courses[key]} lectures={this.props.courses[key].lectures}/>
                </li>
              );
            })
          }
        </ul>
    );
  }
}

CourseList.propTypes = {
  courses: React.PropTypes.object.isRequired
};

export default CourseList;
