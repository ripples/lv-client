import React from "react";
import {connect} from "react-redux";
import CourseList from "../../components/CourseList/CourseList";

/**
 * Page of all the courses that the student is currently enrolled in
 */
class Courses extends React.Component {

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="courses">
        <h1>My Courses</h1>
        <CourseList courses={this.props.courses}/>
      </div>
    );
  }

  /**
   * propTypes Declaration
   * @property {object} courses All of the courses that the student is enrolled in
   */
  static get propTypes() {
    return {
      courses: React.PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

export default connect(mapStateToProps)(Courses);
