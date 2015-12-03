/**
  * LectureView will allow a user to view a selected Lecture
  * It should REACT(lol) to an AppDispatcher dispatch, and will
  * disappear after the shading behind the box is clicked.
  *
  * Structure :
  * LectureView
  * - VidBox
  *   - LectureView
  *   - SlideView
  *   - BoardView
**/


var React = require('react');
var ReactPropTypes = React.PropTypes;


var DialogBox = React.createClass({
  stopClick : function(e){
    // prevent click from interacting past the dialog content pane.
    e.stopPropagation();
  },
  closeClick : function(e){
    // close the dialog when the user clicks out of it. This could
    // potentially be expanded into an 'x' button in the top corner.
    this.props.requestClose();
  },
  render : function(){
    if (!this.props.visible){
      return null;
    }
    return(
      <div className = "dialogUnderlay" onClick = {this.closeClick}>
        <div className = "dialogBox" onClick = {this.stopClick}>
          {this.props.content}
        </div>
      </div>
    );
  }
});

module.exports = DialogBox;
