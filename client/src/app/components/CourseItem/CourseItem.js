import React from "react";
import {Link} from "react-router";
import LectureItem from "components/LectureItem/LectureItem";
import Colors from "constants/ColorConstants";

class CourseItem extends React.Component {
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
          {this.props.lectures.slice(0, NUM_LECTURES).map(lecture => {
            const courseId = this.props["course-data"].id;
            return <LectureItem key={courseId + lecture.lectureId} courseId={courseId} lectureId={lecture.lectureId}
                                title={lecture.title} date={lecture.date} />;
          })}
          {
            (this.props.lectures.length > NUM_LECTURES)
                ? <div className="see-all-lectures">
                    <button>See All ></button>
                  </div> : null
          }
        </div>
      </div>
    );
  }
}

CourseItem.propTypes = {
  "course-data": React.PropTypes.object.isRequired, // TODO: define shape
  "lectures": React.PropTypes.array.isRequired
};

export default CourseItem;
