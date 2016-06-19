"use strict";

import React from "react";

import courseAction from "../actions/CourseAction";
import LectureCard from "./LectureCard.React";

export default class CourseCard extends React.Component {
	constructor() {
		super();
		this.state = {
			show: true
		};
	}
	
	changeDisplay() {
		const course = this.props.course;
		courseAction.fetchLectures(course.id, Object.keys(course.lectures));
		courseAction.filter(this.props.course);
		this.setState({show: !this.state.show});
	}
	
	render() {
		const course = this.props.course;
		// TODO: figure out why render is called twice, this is happens throughout all react components,
		// I'm not sure if this is just part of react or because we're using the lifecycle incorrectly
		const lectures = course.lectures;
		const lecturesCards = Object.keys(lectures).reduce((list, id, i) => {
			if (lectures[id]) {
				list.push(<LectureCard key={i} lecture={lectures[id]}/>);
			}
			return list;
		}, []);
		return (
			<div className="course-card">
				<a className="btn btn-info" onClick={() => this.changeDisplay()}>
					{course.name}
				</a>
				<div className="col-sm-12">
					{lecturesCards}
				</div>
			</div>
		);
	}
}
