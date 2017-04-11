import React from "react";
import {connect} from "react-redux";
import LectureMedia from "../../components/LectureMedia/LectureMedia";
import {getLectureImagesAction, initImageAction, updateVideoTimeStampAction} from "../../libs/actions";
import {lectureNameToDateString} from "../../utils/media";
import {UserTypesEnum} from "../../constants/StateConstants";

class Lecture extends React.Component {

  // TODO: this is the result of limited css selectors + breadcrumbs preceding the Lecture page sibling wise.
  // We can either force the breadcrumbs to be imported into every page, or change the scss build pipeline
  // such that local scss is imported on a per file basis rather than be injected into the global styling scope.
  // I'd rather the latter, but this fix will do until it becomes a problem again.
  componentDidMount() {
    window.document.getElementsByClassName("content")[0].style.backgroundColor = "#0f1419";
    window.document.getElementsByClassName("breadcrumbs")[0].style.color = "white";
  }

  componentWillUnmount() {
    window.document.getElementsByClassName("content")[0].style.backgroundColor = "";
    window.document.getElementsByClassName("breadcrumbs")[0].style.color = "";
    this.props.initImage(this.props.lecture);
  }

  render() {
    if (!this.props.course.lectures) {
      return (<div></div>);
    }
    return (
      <div className="lecture">
        <div className="lecture-header">
          <h1>
            {this.props.course.title}
          </h1>
          <h3>
            {lectureNameToDateString(this.props.lecture.lectureId)}
          </h3>
        </div>
        <div className="lecture-body">
          <LectureMedia
            lecture={this.props.lecture}
            updateVideoTimeStamp={this.props.updateVideoTimeStamp}
          />
        </div>
      </div>
    );
  }
}

Lecture.propTypes = {
  params: React.PropTypes.object,
  lecture: React.PropTypes.object.isRequired,
  course: React.PropTypes.object.isRequired,
  getLectureImages: React.PropTypes.func.isRequired,
  initImage: React.PropTypes.func.isRequired,
  updateVideoTimeStamp: React.PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const params = ownProps.params;
  const course = state.courses[UserTypesEnum.STUDENT][params.courseId];
  if (!course || Object.keys(course).length === 0) {
    return {course: {}, lecture: {}};
  }

  return {
    course,
    lecture: {
      ...course.lectures[params.lectureId],
      title: params.lectureId,
      lectureId: params.lectureId,
      courseId: params.courseId,
      semester: "F16"
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initImage: lecture => dispatch(initImageAction(lecture)),
    getLectureImages: lecture => dispatch(getLectureImagesAction(lecture)),
    updateVideoTimeStamp: (lecture, newTime) => dispatch(updateVideoTimeStampAction(lecture, newTime))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lecture);
