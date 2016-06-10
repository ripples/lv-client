/**
 * Created by igor on 6/10/16.
 */
import React from 'react';


import MediaStore from'../stores/MediaStore';
import MediaActions from'../actions/MediaAction';
import MediaConstants from'../constants/MediaConstants';

export default class VideoView extends React.Component {
    componentDidMount() {
        // create interval function to periodically sync video tracking
        this.checkSyncInterval =
            setInterval(this.checkTimeSync, (500));
    }

    componentWillUnmount() {
        // clear interval function
        clearInterval(this.checkSyncInterval);
    }

    checkTimeSync() {
        // check the video time with the MediaStore
        if (document.getElementById(this.props.videoID).paused) return; // if paused, don't evaluate

        var currentTime = Math.floor(document.getElementById(this.props.videoID).currentTime);
        if (MediaStore.shouldSync(currentTime))
            this.syncTimestamps(currentTime);
    }

    syncTimestamps(timestamp) {
        // synchronize the video time with other components
        MediaActions.sync(timestamp);
    }

    render() {
        return (
            <div className="videoViewContainer">
                <video width="100%" height="70%" id={this.props.videoID} controls>
                    <source src={this.props.src} type="video/mp4"/>
                    Your browser does not support HTML5 video.
                </video>
            </div>
        );
    }
}