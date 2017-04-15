import React from "react";
import {connect} from "react-redux";
import LectureMedia from "../../components/LectureMedia/LectureMedia";
import {initLectureData, getNextImageNames} from "../../actions/media";
import {lectureNameToDateString} from "../../utils/media";

class Lecture extends React.Component {

  componentWillReceiveProps(nextProps) {
    // We're directly loading the app into this page meaning course data may have no loaded yet.
    if (nextProps.course && !nextProps.media.imageNames) {
      nextProps.initLectureData();
    }
  }

  // TODO: this is the result of limited css selectors + breadcrumbs preceding the Lecture page sibling wise.
  // We can either force the breadcrumbs to be imported into every page, or change the scss build pipeline
  // such that local scss is imported on a per file basis rather than be injected into the global styling scope.
  // I'd rather the latter, but this fix will do until it becomes a problem again.
  componentDidMount() {
    window.document.getElementsByClassName("content")[0].style.backgroundColor = "#0f1419";
    window.document.getElementsByClassName("breadcrumbs")[0].style.color = "white";

    // We're accessing the page from another page, meaning the course data has loaded.
    if (this.props.course) {
      this.props.initLectureData();
    }
  }

  componentWillUnmount() {
    window.document.getElementsByClassName("content")[0].style.backgroundColor = "";
    window.document.getElementsByClassName("breadcrumbs")[0].style.color = "";
  }

  render() {
    const course = this.props.course;
    if (!course || !this.props.media.currentImages) {
      return (<div></div>);
    }
    return (
      <div className="lecture">
        <div className="lecture-header">
          <h1>
            {this.props.course.name}
          </h1>
          <h3>
            {lectureNameToDateString(this.props.lecture.id)}
          </h3>
        </div>
        <div className="lecture-body">
          <LectureMedia
            lecture={this.props.lecture}
            media={this.props.media}
            semester={course.semester}
            courseId={course.id}
            getNextImageNames={this.props.getNextImageNames}
          />
        </div>
      </div>
    );
  }
}

Lecture.propTypes = {
  initLectureData: React.PropTypes.func.isRequired,
  getNextImageNames: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  lecture: React.PropTypes.object,
  course: React.PropTypes.object,
  media: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const params = ownProps.params;
  const course = state.courses[params.courseId];
  const media = state.media;
  if (!course) {
    return {course: null, lecture: null, media: null};
  }
  return {
    course,
    media,
    lecture: {
      ...course.lectures[params.lectureId],
      id: params.lectureId
    }
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const lectureId = ownProps.params.lectureId;
  const courseId = ownProps.params.courseId;
  return {
    initLectureData: () => dispatch(initLectureData(courseId, lectureId)),
    getNextImageNames: newTime => dispatch(getNextImageNames(courseId, lectureId, newTime))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lecture);
