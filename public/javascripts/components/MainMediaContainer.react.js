/**
 * Created by igor on 6/10/16.
 */

import React from 'react';
var ReactPropTypes = React.PropTypes;

import LowerMediaContainer from './LowerMediaContainer.react';
import MediaComponent from './MediaComponent.react';

export default class MainMediaContainer extends React.Component {
    render() {
        return (
            <div className="MainMediaWrapper">
                <div className="PrimaryMedia">
                    <div width="100%">
                        <MediaComponent media={this.props.MainMedia}/>
                    </div>
                </div>
                <LowerMediaContainer elements={this.props.LowerMedia}/>
            </div>
        );
    }
}