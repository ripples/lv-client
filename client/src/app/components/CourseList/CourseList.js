import React from "react";
import CourseItem from "components/CourseItem/CourseItem";
import {connect} from "react-redux";

class CourseList extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  getCourseLectures(lectureKeys) {
    // resolve lecture items by key
    return lectureKeys.map(lectureKey => Object.assign({}, this.props.lectures[lectureKey], {lectureId: lectureKey}));
  }

  render() {
    return (
      <ul className="course-list">
      {this.props.courses.map((course, i) => {
        let lectures = this.getCourseLectures(course.lectures);
        return <li key={i}><CourseItem course-data={course} lectures={lectures}/></li>;
      })
      }
      </ul>
    );
  }
}

CourseList.propTypes = {
  courses: React.PropTypes.array.isRequired,
  lectures: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    lectures: Object.assign({}, state.lectures)
  };
};

export default connect(mapStateToProps)(CourseList);
