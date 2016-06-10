/**
 * Created by igor on 6/10/16.
 */

import React from 'react';

import MediaStore from'../stores/MediaStore';
import MediaActions from'../actions/MediaAction';
import MediaConstants from'../constants/MediaConstants';

export default class ImageView extends React.Component {
    render() {
        return (
            <div className="imageContainer">
                <img src={this.props.src}></img>
            </div>
        );
    }
}
