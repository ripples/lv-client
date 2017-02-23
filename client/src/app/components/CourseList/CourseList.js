import React from "react";
import CourseItem from "../../components/CourseItem/CourseItem";

class CourseList extends React.Component {
  render() {
    const courses = this.props.courses;
    return (
      <ul className="course-list">
      {courses.map((course, i) => {
        return <li key={i}><CourseItem course-data={course} lectures={courses[i].lectures}/></li>;
      })
      }
      </ul>
    );
  }
}

CourseList.propTypes = {
  courses: React.PropTypes.array.isRequired
};

export default CourseList;
