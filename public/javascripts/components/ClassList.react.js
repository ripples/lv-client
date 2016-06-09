/**
  * ClassList will have one sub-class of Class
  * This design will allow for the cascading of stateful class
  * information to update the view.
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;
import LectureActions from '../actions/LectureAction';

var Class = React.createClass({
  getInitialState : function(){
    return {show : true};
  },
  changeDisplay : function(){
    LectureActions.filter(this.props.classname);
    this.setState({show : !this.state.show});
  },
  render : function() {
    return (
      <div className = "classContainer">
        <h5 className="classHeader">
          {this.props.classname}
        </h5>
        <span className="classShowSpan" onClick={this.changeDisplay}>
          {(this.state.show)  ? "hide" : "show"}
        </span>
      </div>
    )
  }
});

var ClassList = React.createClass({
  render : function(){
    var classNodes = this.props.classes.map(function(obj, index){
      return(
        <Class key= {index} classname = {obj}>
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
