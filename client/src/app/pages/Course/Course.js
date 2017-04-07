import React from "react";
import {connect} from "react-redux";
import LectureList from "../../components/LectureList/LectureList";

/**
 * Course Page
 */
class Course extends React.Component {

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="course-page">
        <h1>{this.props.course.title}</h1>
        <LectureList course={this.props.course} params={this.props.params}/>
      </div>
    );
  }

  /**
   * propTypes Declaration
   * @property {object} course The given course
   * @property {object} [params] Optional Parameters
   */
  static get propTypes() {
    return {
      course: React.PropTypes.object.isRequired,
      params: React.PropTypes.object
    };
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    course: (typeof state.courses[ownProps.params.courseId] === "undefined") ? {title: " : "} : state.courses[ownProps.params.courseId]
  };
};

export default connect(mapStateToProps)(Course);
