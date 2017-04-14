import React from "react";
import {connect} from "react-redux";
import {getUsersForInstructorAction} from "../../libs/actions";
import {Link} from "react-router";
import InstructorCourseList from "../../components/InstructorCourseList/InstructorCourseList";

class InstructorSettings extends React.Component {
  componentWillMount() {
    console.log("TOM BRADY");
    this.props.getUsersForInstructor();
  }
  render() {
    return (
      <div className="instructor-settings">
        <div className="my-courses">
        <Link to="/courses">My Courses</Link> <span>/</span>
        </div>
        <h1>Course Instructor Options</h1>
        <InstructorCourseList courses={this.props.courses}/>
      </div>
    );
  }
}

InstructorSettings.propTypes = {
  courses: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  getCourses: React.PropTypes.func.isRequired,
  getUsersForInstructor: React.PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    getUsersForInstructor: () => dispatch(getUsersForInstructorAction())
  };
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    users: state.users
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructorSettings);
