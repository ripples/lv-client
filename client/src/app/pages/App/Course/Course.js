import React from "react";

class Course extends React.Component {
  render() {
    return (
      <div className="course">
        <h1>Course {this.props.params.courseId}</h1>
      </div>
    );
  }
}

Course.propTypes = {
  params: React.PropTypes.object
};

export default Course;
