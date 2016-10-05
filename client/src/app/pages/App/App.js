import React from "react";

import Header from "../../components/Header/header";

class App extends React.Component {
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
  children: React.PropTypes.object
};

export default App;
