import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import moment from "moment";

import LectureMedia from "components/LectureMedia/LectureMedia";

class Lecture extends React.Component {
  render() {
    return (
      <div className="lecture">
        <div className="lecture-header">
          <link href="//vjs.zencdn.net/5.11/video-js.min.css" rel="stylesheet" />
          <Link to="/courses">My Courses</Link>
          /
          <Link to={`/courses/${this.props.course.id}`}>
            {this.props.course.title.split(":")[0]}
          </Link>
          /
          {this.props.lecture.title}
          <h1>
            {this.props.course.title}: {this.props.lecture.title}
          </h1>
          <h4>
            {moment(this.props.lecture.date).format("dddd, MMMM Do YYYY")}
          </h4>
        </div>
        <div className="lecture-body">
          <LectureMedia lecture={this.props.lecture} />
        </div>
      </div>
    );
  }
}

Lecture.propTypes = {
  params: React.PropTypes.object,
  lecture: React.PropTypes.object.isRequired,
  course: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    lecture: state.lectures.find(lecture => lecture.lectureId === ownProps.params.lectureId),
    course: state.courses.find(course => course.id === ownProps.params.courseId)
  };
};

export default connect(mapStateToProps)(Lecture);
