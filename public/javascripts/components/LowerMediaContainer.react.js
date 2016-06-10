/**
 * Created by igor on 6/10/16.
 */

import React from 'react';
var ReactPropTypes = React.PropTypes;

import MediaComponent from './MediaComponent.react';


export default class LowerMediaContainer extends React.Component {
    build(elem) {
        if (elem.map) { // check if an array was passed
            var widthPercent = Math.floor((100 / elem.length)).toString() + "%";
            var style = {"width": widthPercent, "height": "100%", "float": "left"};
            return elem.map(function (mediaObj, index) {
                return (
                    <div key={index} style={style}>
                        <MediaComponent media={mediaObj}/>
                    </div>
                )
            });
        }
        else {
            if (this.elem)
                return (
                    <div style={{"width" : "100%",
          "height":"20%", "align" : "center"}}>
                        <MediaComponent media={elem}/> // return the one element passed
                    </div>
                )
            else {
                return null; // return nothing, there is nothing to show.
            }
        }
    }

    render() {
        return (
            <div className="LowerMediaContainer">
                {this.build(this.props.elements)}
            </div>
        )
    }
}