import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";
import {connect} from "react-redux";

class InputView extends React.Component {

  render() {
    return (
      <div>
        <div className="video-view">
          {this.props.image ?
            <img
              src={BASE_URL + this.props.image}
              height={"358"}
              width={"638"}
            />
            : "No Image Found" }
        </div>
    </div>
    );
  }
}

InputView.propTypes = {
  image: React.PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    image: state.media.computerImage || ""
  };
};

export default connect(mapStateToProps)(InputView);
