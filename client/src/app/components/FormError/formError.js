import React, {Component} from "react";

class FormError extends Component {
  render() {
    return (
      <div className="form-error">
        {this.props.error}
      </div>
    );
  }
}

FormError.propTypes = {
  error: React.PropTypes.string.isRequired
};

export default FormError;
