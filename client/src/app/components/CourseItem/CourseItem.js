import React from "react";
import {Link} from "react-router";
import LectureItem from "components/LectureItem/LectureItem";
import Colors from "constants/ColorConstants";

class CourseItem extends React.Component {
  toCoursePage() {
    this.context.router.push(`/courses/${this.props["course-data"].id}`);
  }

  render() {
    const NUM_LECTURES = 5;
    const colorList = [Colors.BLUE, Colors.PURPLE, Colors.YELLOW, Colors.GREEN];

    return (
      <div className="course-item">
        <span className="color-code" style={{ // TODO: alternate colors rather than randomizing
          backgroundColor: colorList[Math.floor(Math.random() * (colorList.length - 0)) + 0]
        }} />
        <h4 className="course-link"><Link to={`/courses/${this.props["course-data"].id}`}>
            {this.props["course-data"].title}
        </Link></h4>
        <div className="lecture-list">
          {Object.keys(this.props.lectures).reverse().slice(0, NUM_LECTURES).map(lectureKey => {
            const course = this.props["course-data"];
            const courseId = course.id;
            return <LectureItem compact={true} key={courseId + lectureKey} courseId={courseId} lectureId={lectureKey}
                                // TODO change title
                                title={lectureKey} date={course.lectures[lectureKey].timestamp} />;
          })}
          {
            (this.props.lectures.length > NUM_LECTURES)
                ? <div className="see-all-lectures">
                    <button onClick={() => this.toCoursePage()}>See All ></button>
                  </div> : null
          }
        </div>
      </div>
    );
  }
}

CourseItem.propTypes = {
  "course-data": React.PropTypes.object.isRequired, // TODO: define shape
  "lectures": React.PropTypes.object.isRequired
};

CourseItem.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CourseItem;
