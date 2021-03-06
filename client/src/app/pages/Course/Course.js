import React from "react";
import {connect} from "react-redux";
import LectureList from "../../components/LectureList/LectureList";

class Course extends React.Component {

  render() {
    return (
      <div className="course-page">
        <h1>{this.props.course.name}</h1>
        <LectureList course={this.props.course} params={this.props.params}/>
      </div>
    );
  }
}

Course.propTypes = {
  course: React.PropTypes.object.isRequired,
  params: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    course: (typeof state.courses[ownProps.params.courseId] === "undefined") ? {title: " : "} : state.courses[ownProps.params.courseId]
  };
};

export default connect(mapStateToProps)(Course);
