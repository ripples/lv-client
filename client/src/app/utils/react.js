"use strict";

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
