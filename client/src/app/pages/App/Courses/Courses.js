import React from "react";
import {connect} from "react-redux";
import CourseList from "./../../../components/CourseList/CourseList";
import {getCoursesAction} from "./../../../libs/actions";

class Courses extends React.Component {
  componentWillMount() {
    this.props.dispatch(getCoursesAction());
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
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    lectures: state.lectures
  };
};

export default connect(mapStateToProps)(Courses);
