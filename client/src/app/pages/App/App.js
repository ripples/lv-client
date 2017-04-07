import React from "react";
import {connect} from "react-redux";
import Breadcrumbs from "react-breadcrumbs";
import Header from "../../components/Header/header";
import {getCoursesAction} from "./../../libs/actions";

/**
 * Top level App component
 */
class App extends React.Component {

  /**
   * React method, Allows for lectures to be resized dynamically
   */
  componentWillMount() {
    this.props.getCourses();
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="root-app">
        <Header />
        <div className="content">
          <Breadcrumbs
            separator=" / "
            excludes={["App"]}
            routes={this.props.routes}
            params={this.props.params}
          />
          {this.props.children}
        </div>
      </div>
    );
  }

  /**
   * propTypes Declaration
   * @property {func} getCourses Dispatch funtion for getCourses
   * @property {array} routess An array of routes
   * @property {object} params Parameters that are passed down
   * @property {object} children Child components
   */
  static get propTypes() {
    return {
      getCourses: React.PropTypes.func.isRequired,
      routes: React.PropTypes.array.isRequired,
      params: React.PropTypes.object.isRequired,
      children: React.PropTypes.object
    };
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    getCourses: () => dispatch(getCoursesAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
