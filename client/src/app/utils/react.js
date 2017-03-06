"use strict";

import moment from "moment";

/**
 * Updates the state of a component with a key event
 * @param {React.Component} instance - react component instance i.e. `this`
 * @param {KeyboardEvent} e - key press event
 * @param {String} field - field to update
 */
export function handleChange(instance, e, field) {
  e.preventDefault();
  instance.setState({[field]: e.target.value});
}

/**
 * Converts lecture name to readable date string
 * @param {String} date - lecture name produced from capture system
 * @return {string} human readable date string
 */
export function lectureNameToDate(date) {
  return moment(date, "MM-DD-YYYY--HH-mm-ss").format("MMMM Do YYYY");
}
