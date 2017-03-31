import React from "react";
import {connect} from "react-redux";
import CourseList from "../../components/CourseList/CourseList";
import {UserTypesEnum} from "../../constants/StateConstants";

class Courses extends React.Component {

  render() {
    return (
      <div className="courses">
        <h1>My Courses</h1>
        <CourseList courses={this.props.courses}/>
      </div>
    );
  }
}

Courses.propTypes = {
  courses: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses[UserTypesEnum.STUDENT] || {}
  };
};

export default connect(mapStateToProps)(Courses);
