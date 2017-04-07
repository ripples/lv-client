import React, {Component} from "react";

/**
 * Used for Errors
 */
class FormError extends Component {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="form-error">
        {this.props.error}
      </div>
    );
  }

  /**
   * propTypes Declaration
   * @property {string} error The error passed down
   */
  static get propTypes() {
    return {
      error: React.PropTypes.string.isRequired
    };
  }
}

export default FormError;
