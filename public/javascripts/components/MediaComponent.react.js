/**
 * MediaComponent is a "Superclass"
 **/


import React from 'react';
var ReactPropTypes = React.PropTypes;

import MediaConstants from'../constants/MediaConstants';

import ImageView from './ImageView.react';
import VideoView from './VideoView.react';


export default class MediaComponent extends React.Component {
    generateMediaObject() {
        switch (this.props.media.type) {
            case "video" :
                var videoID = "video" + this.props.media.data.id;
                return (
                    <VideoView
                        src={this.props.media.data.url}
                        videoID={videoID}/>
                );
                break;
            case "images" :
                var source = "/images/" + this.props.media.data.id +
                    "/" + this.props.media.data.timestamp + '.png';
                return (
                    <ImageView
                        src={source}/>
                );
                break;
            default :
                break;
        }
    }

    render() {
        var mediaObj = this.generateMediaObject();
        return (
            <div className="MediaComponent">
                {mediaObj}
            </div>
        )
    }
}

