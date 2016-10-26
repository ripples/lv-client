import React from "react";
import {connect} from "react-redux";

class Lecture extends React.Component {
  render() {
    return (
      <div className="lecture">
        <h1>{this.props.lecture.title}</h1>
      </div>
    );
  }
}

Lecture.propTypes = {
  params: React.PropTypes.object,
  lecture: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    lecture: Object.assign({}, state.lectures[ownProps.params.lectureId])
  };
};

export default connect(mapStateToProps)(Lecture);
