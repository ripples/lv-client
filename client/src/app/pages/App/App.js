import React from "react";
import {connect} from "react-redux";
import Breadcrumbs from "react-breadcrumbs";
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
}

App.propTypes = {
  getCourses: React.PropTypes.func.isRequired,
  routes: React.PropTypes.array.isRequired,
  params: React.PropTypes.object.isRequired,
  children: React.PropTypes.object
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
