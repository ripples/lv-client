/**
  * MediaComponent is a "Superclass"
**/


var React = require('react');
var ReactPropTypes = React.PropTypes;

var MediaConstants = require('../constants/MediaConstants');
var MediaStore = require('../stores/MediaStore');
var MediaActions = require('../actions/MediaAction');

var ImageView = React.createClass({
  render : function(){
    return (
      <div className = "imageContainer" >
        <img src = {this.props.src}></img>
      </div>
    );
  }
});

var VideoView = React.createClass({
  componentDidMount : function(){
    // create interval function to periodically sync video tracking
    this.checkSyncInterval =
    setInterval(this.checkTimeSync,(500));
  },
  componentWillUnmount : function(){
    // clear interval function
    clearInterval(this.checkSyncInterval);
  },
  checkTimeSync : function(){
    // check the video time with the MediaStore
    if (document.getElementById(this.props.videoID).paused) return; // if paused, don't evaluate

    var currentTime = Math.floor(document.getElementById(this.props.videoID).currentTime);
    if (MediaStore.shouldSync(currentTime))
      this.syncTimestamps(currentTime);
  },
  syncTimestamps : function(timestamp){
    // synchronize the video time with other components
    MediaActions.sync(timestamp);
  },
  render : function(){
    return (
      <div className = "videoViewContainer">
        <video width="100%" height = "70%" id={this.props.videoID} controls>
          <source src={this.props.src} type="video/mp4"></source>
          Your browser does not support HTML5 video.
        </video>
    </div>
    );
  }
});

var MediaComponent = React.createClass({
  generateMediaObject : function(){
    switch (this.props.media.type){
      case "video" :
        var videoID = "video" + this.props.media.data.id;
        return(
          <VideoView
            src = {this.props.media.data.url}
            videoID = {videoID}></VideoView>
        );
      break;
      case "images" :
        var source = "/images/"+this.props.media.data.id+
                      "/"+this.props.media.data.timestamp+'.png';
        return(
          <ImageView
            src={source}></ImageView>
        );
      break;
      default :
      break;
    }
  },
  render : function(){
    var mediaObj = this.generateMediaObject();
    return(
      <div className="MediaComponent">
        {mediaObj}
      </div>
    )
  }
})

module.exports = MediaComponent;
