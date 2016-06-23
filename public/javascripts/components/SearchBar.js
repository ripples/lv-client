"use strict";
/**
 * Search bar will have the input form so the user can filter the lectures he wants to watch
 * TODO: complete the style of the component
 */

import React from "react";
import Chance from "chance";
const chance = new Chance();
import CourseActions from "../actions/CourseAction";
import $ from "jquery";

export default class SearchBar extends React.Component {
  constructor() {
    super();
    this.searchWaitTime = 1500;
  }

  render() {
    const styleClasses = this.getStyleClasses();
    const selectCourse = this.getSelectCourses();
    return (
      <div className={styleClasses}>
        <label for="name">Find</label>
        <input
          id="name"
          ref={(input)=>this.search = input}
          type="text"
          placeholder="Search Lectures (course, date, keyword)"
          onChange={this._handleSearch.bind(this)}/>
        {selectCourse}
      </div>
    );
  }

  /**
   * @return {string} - classes to be applied to the main div of the this component
   */
  getStyleClasses() {
    return "container-fluid searchBar well text";
  }

  /**
   *
   * @returns {XML} - Select option of the search bar
   */
  getSelectCourses() {
    let courses = [];
    const itr = this.props.courses;
    Object.keys(itr).forEach((key)=>courses.push(
      <option key={chance.integer()} value={itr[key].id}>{itr[key].name} </option>)
    );
    return (
      <select name="courses">
        <option value="0" defaultValue>All Couses</option>
        {courses}
      </select>
    );
  }

  /**
   * handle the search
   * @private
   */
  _handleSearch() {
    // this has to be a class variable, otherwise it will fire the setTimeout function multiple times
    this.iddleTime;
    clearTimeout(this.iddleTime);
    this.iddleTime = setTimeout(this._doSearchRequest.bind(this), this.searchWaitTime);
  }

  /**
   * fires the action to make the request for the search
   * @private
   */
  _doSearchRequest() {
    const searchContent = this.search.value;
    const courseId = $('select[name=courses] option:selected').val();
    console.log(`Selected Option: ${courseId}`);
    CourseActions.fetchSearchResult(searchContent);
  }
}