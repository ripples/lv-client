import React from "react";
import {connect} from "react-redux";

class Course extends React.Component {
  render() {
    return (
      <div className="course">
        <h1>Course {this.props.params.courseId}</h1>
      </div>
    );
  }
}

Course.propTypes = {
  params: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    course: state.courses.find(course => course.id === ownProps.params.courseId)
  };
};

export default connect(mapStateToProps)(Course);
