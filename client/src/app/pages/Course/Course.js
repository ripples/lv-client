import React from "react";
import {connect} from "react-redux";
import LectureList from "../../components/LectureList/LectureList";
import {UserTypesEnum} from "../../constants/StateConstants";

class Course extends React.Component {

  render() {
    return (
      <div className="course-page">
        <h1>{this.props.course.title}</h1>
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
  const course = state.courses[UserTypesEnum.STUDENT][ownProps.params.courseId];
  return {
    course: course || {title: " : "}
  };
};

export default connect(mapStateToProps)(Course);
