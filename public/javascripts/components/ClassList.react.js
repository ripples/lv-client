/**
  * ClassList will have one sub-class of Class
  * This design will allow for the cascading of stateful class
  * information to update the view.
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;
var LectureActions = require('../actions/LectureAction');

var Class = React.createClass({
  getInitialState : function(){
    return {show : true};
  },
  render : function() {
    return (
      <div className = "classContainer">
        <h3 className="classHeader">
          {this.props.classname}
        </h3>
        <span className="classShowSpan">
          {(this.state.show)  ? "hide" : "show"}
        </span>
      </div>
    )
  }
});

var ClassList = React.createClass({
  render : function(){
    var classNodes = this.props.classes.map(function(obj){
      return(
        <Class classname = {obj}>
        </Class>
      )
    });
    return(
      <div className = "ClassList">
        {classNodes}
      </div>
    )
  }
});

module.exports = ClassList;
