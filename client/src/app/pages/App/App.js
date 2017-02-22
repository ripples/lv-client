import React from "react";
import {connect} from "react-redux";
import Header from "../../components/Header/header";
import {getCoursesAction} from "./../../libs/actions";

class App extends React.Component {

  componentWillMount() {
    this.props.getCourses();
  }

  render() {
    return (
      <div className="root-app">
        <Header />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  getCourses: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    getCourses: () => dispatch(getCoursesAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
