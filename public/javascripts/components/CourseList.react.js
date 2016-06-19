"use strict";

/**
 * CourseList will have one sub-course of Course
 * This design will allow for the cascading of stateful course
 * information to update the view.
 **/

import React from "react";

import CourseCard from "./CourseCard.react";

export default class CourseList extends React.Component {
	render() {
		const courses = this.props.courses;
		const courseCards = Object.keys(courses).map((id, i) => {
			return (
				<div className="col-sm-12">
					<CourseCard key={i} course={courses[id]}/>
				</div>
			);
		});
		return (
			<div className="course-card container-fluid">
				{courseCards}
			</div>
		);
	}
}

