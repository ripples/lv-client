import React from "react";
import {connect} from "react-redux";

class InstructorCourseList extends React.Component {
  render() {
    return (
      <div className="something">
        ahah
      </div>
    );
  }
}

InstructorCourseList.propTypes = {
  courses: React.PropTypes.array,
  lectures: React.PropTypes.array
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    lectures: state.lectures
  };
};

export default connect(mapStateToProps)(InstructorCourseList);
