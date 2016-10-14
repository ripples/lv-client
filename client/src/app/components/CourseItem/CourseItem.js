import React from "react";
import LectureItem from "components/LectureItem/LectureItem";

class CourseItem extends React.Component {
  render() {
    const NUM_LECTURES = 5;

    return (
      <div className="course-item">
        <h4>{this.props["course-data"].title}</h4>
        <div className="lecture-list">
          {this.props.lectures.slice(0, NUM_LECTURES).map((lecture, i) => {
            return <LectureItem key={i} title={lecture.title} date={lecture.date} />;
          })}
          {
            (this.props.lectures.length > NUM_LECTURES) ?
              <div className="see-all-lectures">
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