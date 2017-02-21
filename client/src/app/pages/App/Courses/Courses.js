import React from "react";
import {connect} from "react-redux";
import CourseList from "./../../../components/CourseList/CourseList";
import {getCoursesAction} from "./../../../libs/actions";

class Courses extends React.Component {
  componentWillMount() {
    this.props.getCourses();
  }
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
  lectures: React.PropTypes.array.isRequired,
  getCourses: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    lectures: state.lectures
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCourses: () => dispatch(getCoursesAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
