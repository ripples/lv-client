import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import LectureList from "components/LectureList/LectureList";

class Course extends React.Component {

  render() {
    return (
      <div className="course">
        <Link to="/courses">My Courses</Link> / {this.props.course.title.split(":")[0]} /
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
  return {
    course: state.courses[ownProps.params.courseId]
  };
};

export default connect(mapStateToProps)(Course);
