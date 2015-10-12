/**
  * ClassList will have one sub-class of Class
  * This design will allow for the cascading of stateful class
  * information to update the view.
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;

var Class = React.createClass({
  render : function() {
    return (
      <div className = "classContainer">
        <h3 className="classHeader">{this.props.Classname}</h3>
        <span className="classDescription">{this.props.classDescription}</span>
      </div>
    )
  }
});

var ClassList = React.createClass({

  getInitialState : function(){
    return{
      this.state.classes = [];
    }
  },
  render : function(){
    var classList = this.state.classes.prototype.map(function(obj){
      return(
        <Class 
          Classname ={obj.Classname}
          classDescription = {obj.classDescription}>
        </Class>
      )
    });
  }
});
