import React from "react";
import {connect} from "react-redux";
import CourseList from "./../../../components/CourseList/CourseList";

class Courses extends React.Component {

  render() {
    return (
      <div className="courses">
        <h1>My Courses</h1>
        <CourseList courses={this.props.courses} lectures={this.props.lectures} />
      </div>
    );
  }
}

Courses.propTypes = {
  courses: React.PropTypes.array.isRequired,
  lectures: React.PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    lectures: state.lectures
  };
};

export default connect(mapStateToProps)(Courses);
