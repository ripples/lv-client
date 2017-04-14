import React from "react";
import VideoView from "../../components/VideoView/VideoView";
import ImageView from "../ImageView/ImageView";
import ThumbnailControl from "../../components/ThumbnailControl/ThumbnailControl";
import {BASE_URL} from "../../constants/ApiConstants";


class LectureMedia extends React.Component {
  constructor(props) {
    super(props);
    this.onVideoTimeUpdate = this.onVideoTimeUpdate.bind(this);
  }

  /**
   * Callback for getting next image based on new video timestamp
   * @param {Number} newTimeStamp - new video timestamp
   */
  onVideoTimeUpdate(newTimeStamp) {
    this.props.getNextImageNames(newTimeStamp);
  }

  render() {
    const lecture = this.props.lecture;
    const media = this.props.media;
    const semester = this.props.semester;
    const courseId = this.props.courseId;

    const computerImages = media.currentImages.computer;
    const whiteboardImages = media.currentImages.whiteboard;
    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              videoSrc={`${BASE_URL}/media/${semester}/${courseId}/${lecture.id}/video`}
              onVideoTimeUpdate={this.onVideoTimeUpdate}
            />
          </div>
        </div>
        {
          Object.keys(computerImages).map(mediaIndex => {
            const images = computerImages[mediaIndex];
            return (
              <div className="container" key={`computer-${mediaIndex}`}>
                <div className="video-wrapper">
                  <ImageView
                    src={images.full.src}
                  />
                  <ThumbnailControl
                    thumbnails={images.thumbs}
                  />
                </div>
              </div>
            );
          })
        }
        {
          Object.keys(whiteboardImages).map(mediaIndex => {
            const images = whiteboardImages[mediaIndex];
            return (
              <div className="container" key={`whiteboard-${mediaIndex}`}>
                <div className="video-wrapper">
                  <ImageView
                    src={images.full.src}
                  />
                  <ThumbnailControl
                    thumbnails={images.thumbs}
                  />
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

LectureMedia.propTypes = {
  lecture: React.PropTypes.object.isRequired,
  media: React.PropTypes.object.isRequired,
  semester: React.PropTypes.string.isRequired,
  courseId: React.PropTypes.string.isRequired,
  getNextImageNames: React.PropTypes.func.isRequired
};

export default LectureMedia;
