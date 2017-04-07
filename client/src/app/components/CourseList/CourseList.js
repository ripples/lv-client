import React from "react";
import CourseItem from "../../components/CourseItem/CourseItem";

/**
 * A List of courses that contain CourseItems
 * @type {React.Component}
 */
class CourseList extends React.Component {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
        <ul className="course-list">
          {
            Object.keys(this.props.courses).map((key, i) => {
              return (
                <li key={i}>
                  <CourseItem course={this.props.courses[key]} lectures={this.props.courses[key].lectures}/>
                </li>
              );
            })
          }
        </ul>
    );
  }

  /**
   * propTypes Declaration
   * @property {object} courses courses to be displayed
   */
  static get propTypes() {
    return {
      courses: React.PropTypes.object.isRequired
    };
  }
}

export default CourseList;
