import React from "react";
import VideoView from "../../components/VideoView/VideoView";
import ImageView from "../ImageView/ImageView";
import ThumbnailControl from "../../components/ThumbnailControl/ThumbnailControl";
import {BASE_URL} from "../../constants/ApiConstants";

class LectureMedia extends React.Component {
  constructor(props) {
    super(props);
    this.updateVideoTimeStamp = this.updateVideoTimeStamp.bind(this);
  }

  updateVideoTimeStamp(newTimeStamp) {
    this.props.updateVideoTimeStamp(this.props.lecture, newTimeStamp);
  }

  render() {
    const lecture = this.props.lecture;
    let computerSrc = "/images/no-image-found.png";
    let whiteboardSrc = "/images/no-image-found.png";
    let computerThumbSrc = Array(5).fill({
      src: "/images/no-image-found-thumb.png",
      timestamp: 0
    });
    let whiteboardThumbSrc = Array(5).fill({
      src: "/images/no-image-found-thumb.png",
      timestamp: 0
    });
    if (lecture.currentImages) {
      if (lecture.currentImages.computer.full) {
        computerSrc = BASE_URL + lecture.currentImages.computer.full;
      }
      if (lecture.currentImages.whiteboard.full) {
        whiteboardSrc = BASE_URL + lecture.currentImages.whiteboard.full;
      }
      computerThumbSrc = lecture.currentImages.computer.thumbs.map(thumb => {
        return {
          src: BASE_URL + thumb.src,
          timestamp: thumb.timestamp
        };
      });
      whiteboardThumbSrc = lecture.currentImages.whiteboard.thumbs.map(thumb => {
        return {
          src: BASE_URL + thumb.src,
          timestamp: thumb.timestamp
        };
      });
    }
    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              videoSrc={`${BASE_URL}/media/${lecture.semester}/${lecture.courseId}/${lecture.lectureId}/video`}
              updateVideoTimeStamp={this.updateVideoTimeStamp}
            />
          </div>
        </div>
        <div className="container">
          <div className="video-wrapper">
            <ImageView imageSrc={ computerSrc } />
            <ThumbnailControl thumbnails={ computerThumbSrc }/>
          </div>
        </div>
        <div className="container">
          <div className="video-wrapper">
            <ImageView imageSrc={ whiteboardSrc } />
            <ThumbnailControl thumbnails={ whiteboardThumbSrc }/>
          </div>
        </div>
      </div>
    );
  }
}

LectureMedia.propTypes = {
  lecture: React.PropTypes.object.isRequired,
  updateVideoTimeStamp: React.PropTypes.func.isRequired
};

export default LectureMedia;
