/**
 * LectureView will allow a user to view a selected Lecture
 * It should REACT(lol) to an AppDispatcher dispatch, and will
 * disappear after the shading behind the box is clicked.
 *
 **/


import React from 'react';
var ReactPropTypes = React.PropTypes;
import MainMediaContainer from './MainMediaContainer.react';

export default class MediaView extends React.Component {
    render() {
        var MediaCopy = this.props.media.slice();
        return (
            <div className="MediaView">
                <MainMediaContainer
                    MainMedia={MediaCopy.splice(this.props.primary, 1)[0]}
                    LowerMedia={MediaCopy}
                />
            </div>
        );
    }
}

