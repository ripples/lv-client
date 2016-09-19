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
      semester: "*"
    }
  }
  
  componentDidMount() {
    //this._refineSearch();
  }
  
  render() {
    const renderedKeyWords = this.state.keywords.map(keyword =>
      <div key={keyword} className="col-sm-4">
        {keyword} <a href="#" onClick={this._deleteKeyword.bind(this)}>
        <span data-word={keyword} className="glyphicon glyphicon-remove"/></a>
      </div>
    );
    const filters = this.getFilters();
    const renderedFilters = Object.keys(this.getFilters()).map(filter =>
      <div key={filter}>
        <label>
          {filter}
        </label>
        <input type="radio" name="semesters" onChange={this._handleFilters.bind(this)} value={filters[filter]}/>
      </div>);
    return (
      <Col sm={3} className="well">
        <div className="container-fluid">
          <h1> Refine Search</h1>
          <h3>KEYWORDS</h3>
          <form onSubmit={this._addKeyWord.bind(this)} name="keywords">
            <input type="text" ref={keyword=>this._keyword = keyword} minLength="2"/>
            <button onClick={this._addKeyWord.bind(this)} bsStyle="info" size="small" className="btn btn-sm btn-info-">
              ADD KEYWORD
            </button>
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
   * @param event - event submition
   * @private
   */
  _addKeyWord(event) {
    event.preventDefault();
    const keyword = this._keyword.value;
    $(this._keyword).val("");
    if (keyword.length > 1) {
      const keyWordsArr = this.state.keywords.concat(keyword);
      this.setState({keywords: keyWordsArr}, this._refineSearch.bind(this));
    }
  }
  
  /**
   * delete keywords that were added
   * @param event - click event
   * @private
   */
  _deleteKeyword(event) {
    event.preventDefault();
    const deletedKeyword = $(event.target).data("word");
    let updatedKeywords = this.state.keywords.filter(keyWord => keyWord != deletedKeyword);
    this.setState({keywords: updatedKeywords}, this._refineSearch.bind(this));
  }
  
  /**
   *
   * @param event - event submition
   * @private
   */
  _handleFilters(event) {
    const value = event.target.value || "*";
    let filter = {
      semester: value,
    };
    this.setState(filter, this._refineSearch.bind(this));
  }
  
  /**
   * call the method to refine the search
   * @private
   */
  _refineSearch() {
    this.props.setSearchFilters({
      keywords: this.state.keywords,
      semester: this.state.semester
    })
  }
  
  /**
   * Temporary way to get the filters (might need a const file or a database table)
   * @returns {string[]} - array with the filters
   */
  getFilters() {
    return {
      "All Course": this.props.semesterOptions.all,
      "Current Semester": this.props.semesterOptions.current,
      "Past Semesters": this.props.semesterOptions.past
    };
  }
}
SideBar.propTypes = {
  setSearchFilters: React.PropTypes.func.isRequired,
  semesterOptions: React.PropTypes.object.isRequired
};
