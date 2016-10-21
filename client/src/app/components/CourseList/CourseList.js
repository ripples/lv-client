import React from "react";
import CourseItem from "components/CourseItem/CourseItem";

class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this._courses = [
      {
        id: "CMPSCI_377",
        title: "COMPSCI 377: Operating Systems",
        lectures: ["cs377Lecture01", "cs377Lecture02", "cs377Lecture03", "cs377Lecture04", "cs377Lecture05", "cs377Lecture06"]
      },
      {
        id: "PHYS_151_02",
        title: "PHYSICS 151-02: Physics I",
        lectures: ["phys15102Lecture01"]
      }
    ];
    this._lectures = {
      cs377Lecture01: {
        title: "Lecture 01",
        date: 1476333797611
      },
      cs377Lecture02: {
        title: "Lecture 02",
        date: 1476333797611
      },
      cs377Lecture03: {
        title: "Lecture 03",
        date: 1476333797611
      },
      cs377Lecture04: {
        title: "Lecture 04",
        date: 1476333797611
      },
      cs377Lecture05: {
        title: "Lecture 05",
        date: 1476333797611
      },
      cs377Lecture06: {
        title: "Lecture 06",
        date: 1476333797611
      },
      phys15102Lecture01: {
        title: "Lecture 01",
        date: 1476333797611
      }
    };
  }

  getCourseLectures(lectureKeys) {
    // resolve lecture items by key
    return lectureKeys.map(lectureKey => Object.assign({}, this._lectures[lectureKey], {lectureId: lectureKey}));
  }

  render() {
    return (
      <ul className="course-list">
      {this._courses.map((course, i) => {
        let lectures = this.getCourseLectures(course.lectures);
        return <li key={i}><CourseItem course-data={course} lectures={lectures}/></li>;
      })
      }
      </ul>
    );
  }
}

export default CourseList;
