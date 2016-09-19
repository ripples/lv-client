"use strict";

/**
 * MediaComponent is a "Superclass"
 **/

import React from "react";
import Carousel from "nuka-carousel";

import {IMAGE_TYPES, THUMBNAIL_SIZE} from "../constants/MediaConstants";
import {getMaxThumbs} from "../utils/sync";

const T = React.PropTypes;

export default class TimelineComponent extends React.Component {
  static propTypes = {
    computer: T.objectOf(T.arrayOf(T.any)).isRequired,
    whiteboard: T.objectOf(T.arrayOf(T.any)).isRequired,
    currentIndex: T.any, // TODO: type annotate
    fetchMedia: T.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
  }

  handleMouseWheel(event) {
  }

  _buildCarouselAttributes() {
    return {
      cellAlign: 'center',
      cellSpacing: THUMBNAIL_SIZE / 2,
      slidesToShow: getMaxThumbs(),
      onwheel: this.handleMouseWheel,
      initialSlideWidth: THUMBNAIL_SIZE,
      initialSlideHeight: THUMBNAIL_SIZE,
    }
  }

  _buildCarousels() {
    // const attributes = this._buildCarouselAttributes();
    const props = this.props;
    const indexes = props.currentIndex;

    return IMAGE_TYPES.map(imageType => {
      let imagesToRequest = [];
      const typeImages = props[imageType];
      const images = Object.keys(typeImages).map(id => {
        const imageIndexes = indexes[imageType][id];
        const images = typeImages[id].slice(imageIndexes.start, imageIndexes.end).map(imageInfo => {
          if (typeof (imageInfo) === "string") {
            imagesToRequest.push(imageInfo);
            return <img/>
          }
          return <img src={imageInfo.url} key={imageInfo.name}/>;
        });
        return (
          <div className="carousel">
            {images}
          </div>
        );
      });
      if (imagesToRequest.length > 0) {
        this.props.fetchMedia(imagesToRequest, imageType);
      }
      return images;
    });
  }

  render() {
    const carousels = this._buildCarousels();
    return (
      <div>
        {carousels}
      </div>
    );
  }
}
