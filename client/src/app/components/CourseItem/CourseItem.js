import React from "react";
import {Link} from "react-router";
import LectureItem from "../../components/LectureItem/LectureItem";
import Colors from "../../constants/ColorConstants";

class CourseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfLectures: Math.floor((window.innerWidth - 256) / 264) - 1
    };
    this.updateNumberOfLectures = this.updateNumberOfLectures.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateNumberOfLectures);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateNumberOfLectures);
  }

  toCoursePage() {
    this.context.router.push(`/courses/${this.props.course.id}`);
  }

  updateNumberOfLectures() {
    this.setState({
      numberOfLectures: Math.floor((window.innerWidth - 256) / 264) - 1
    });
  }

  render() {
    const colorList = [Colors.BLUE, Colors.PURPLE, Colors.YELLOW, Colors.GREEN];
    const lectures = Object.keys(this.props.lectures);
    return (
      <div className="course-item">
        <span
          className="color-code"
          style={{ // TODO: alternate colors rather than randomizing
            backgroundColor: colorList[Math.floor(Math.random() * (colorList.length - 0)) + 0]
          }}
        />
        <h4 className="course-link">
          <Link to={`/courses/${this.props.course.id}`}>
            {this.props.course.title}
          </Link>
        </h4>
        <div className="lecture-list">
          {
            lectures.reverse().slice(0, this.state.numberOfLectures).map(lectureId => {
              const course = this.props.course;
              return <LectureItem
                      compact={true}
                      key={course.id + lectureId}
                      courseId={course.id}
                      lectureId={lectureId}
                      title={lectureId}
                      date={course.lectures[lectureId].timestamp}
                      />;
            })
          }
          <div className="see-all-lectures">
            <button onClick={() => this.toCoursePage()}>See All ></button>
          </div>
        </div>
      </div>
    );
  }
}

CourseItem.propTypes = {
  course: React.PropTypes.object.isRequired, // TODO: define shape
  lectures: React.PropTypes.object.isRequired
};

CourseItem.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CourseItem;
