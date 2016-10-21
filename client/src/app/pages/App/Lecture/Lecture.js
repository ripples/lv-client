import React from "react";

class Lecture extends React.Component {
  render() {
    return (
      <div className="lecture">
        <h1>Lecture {this.props.params.lectureId}</h1>
      </div>
    );
  }
}

Lecture.propTypes = {
  params: React.PropTypes.object
};

export default Lecture;
