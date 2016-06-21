import React from "react";
import Chance from "chance";
const chance = new Chance();

export default class SearchBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    let courses = [];
    const itr = this.props.courses;
    Object.keys(itr).forEach((key)=>courses.push(
      <option key={chance.integer()} value={itr[key].id}>{itr[key].name}</option>)
    );
    return (

      <div className="container-fluid">
        <form>
          <label htmlFor="name">Find</label>
          <input
            name="search"
            type="text"
            placeholder="Search Lectures (course, date, keyword)"/>
          <select name="courses" id="">
            {courses}
          </select>
        </form>
      </div>
    );
  }
}