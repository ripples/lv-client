"use strict";

import React from "react";
import $ from "jquery";
import {Col, Button} from "react-bootstrap";

/**
 * SideBar: contain  the inout to add keywords and the filer options
 * TODO: styling of the component
 */

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = this.getState();
  }

  /**
   * Gets the initial state of the component
   * @returns {{keywords: Array, filterOptions: Array}}
   */
  getState() {
    return {
      keywords: [],
      filterOptions: []
    }
  }

  render() {
    const renderedKeyWords = this.state.keywords.map(keyword =>
      <div key={keyword} className="col-sm-4">
        {keyword}
      </div>
    );
    const renderedFilters = this.getFilters().map(filter =>
      <div key={filter}>
        <label>
          {filter}
        </label>
        <input type="checkbox" value={filter}/>
      </div>);
    return (
      <Col sm={3} className="well">
        <div className="container-fluid">

          <h1> Refine Search</h1>
          <h3>KEYWORDS</h3>
          <form onSubmit={this._addKeyWord.bind(this)} name="keywords">
            <input type="text" ref={keyword=>this._keyword = keyword} minlength="2"/>
            <Button onClick={this._addKeyWord.bind(this)} bsStyle="info" size="small">
              ADD KEYWORD
            </Button>
          </form>
          {renderedKeyWords}
        </div>
        <div className="container-fluid">
          <h3>FILTER</h3>
          <form onSubmit={this._handleFilters.bind(this)} name="filters">
            {renderedFilters}
          </form>
        </div>
      </Col>
    );
  }

  /**
   * Handles the insetion of the keywords into the page
   * @param e - event submition
   * @private
   */
  _addKeyWord(e) {
    e.preventDefault();
    const keyword = this._keyword.value;
    $(this._keyword).val("");
    if (keyword.length > 1) {
      const keyWordsArr = this.state.keywords.concat(keyword);
      this.setState({keywords: keyWordsArr});
    }
  }

  /**
   *
   * @param e - event submition
   * @private
   */
  _handleFilters(e) {
    e.preventDefault();

  }

  /**
   * Temporary way to get the filters (might need a const file or a database table)
   * @returns {string[]} - array with the filters
   */
  getFilters() {
    return ["All Course", "Current Semester", "Past Semesters"];
  }
}
