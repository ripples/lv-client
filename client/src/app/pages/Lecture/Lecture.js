import React from "react";
import {connect} from "react-redux";
import LectureMedia from "../../components/LectureMedia/LectureMedia";
import {getLectureImagesAction, initImageAction, updateVideoTimeStampAction} from "../../libs/actions";
import {lectureNameToDate} from "../../utils/react";

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
    if (this.props.course.empty) {
      return (<div></div>);
    }
    return (
      <div className="lecture">
        <div className="lecture-header">
          <h1>
            {this.props.course.title}
          </h1>
          <h3>
            {lectureNameToDate(this.props.lecture.lectureId)}
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

// TODO figure out a way to avoid courses ever being empty
const mapStateToProps = (state, ownProps) => {
  let course = state.courses[ownProps.params.courseId];
  if (!course) {
    return {course: {empty: true}, lecture: {empty: true}};
  }
  let lecture = {
    ...course.lectures[ownProps.params.lectureId],
    title: ownProps.params.lectureId,
    lectureId: ownProps.params.lectureId,
    courseId: ownProps.params.courseId,
    semester: "F16"
  };
  return {
    course,
    lecture
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
