import React from "react";
import {connect} from "react-redux";
import CourseList from "./../../../components/CourseList/CourseList";

class Courses extends React.Component {

  render() {
    return (
      <div className="courses">
        <h1>My Courses</h1>
        <CourseList courses={this.props.courses}/>
      </div>
    );
  }
}

Courses.propTypes = {
  courses: React.PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

export default connect(mapStateToProps)(Courses);
