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

  onVideoTimeUpdate(newTimeStamp) {
    this.props.getNextImageNames(this.props.lecture, newTimeStamp);
  }

  render() {
    const lecture = this.props.lecture;
    let computerSrc = "/images/no-image-found.png";
    let thumbSrc = Array(5).fill({
      src: "/images/no-image-found-thumb.png",
      timestamp: 0
    });
    if (lecture.currentImages) {
      if (lecture.currentImages.computer.full) {
        computerSrc = BASE_URL + lecture.currentImages.computer.full;
      }
      thumbSrc = lecture.currentImages.computer.thumbs.map(thumb => {
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
              onVideoTimeUpdate={this.onVideoTimeUpdate}
            />
          </div>
        </div>
        <div className="container">
          <div className="video-wrapper">
            <ImageView imageSrc={ computerSrc } />
            <ThumbnailControl
              thumbnails={ thumbSrc }
            />
          </div>
        </div>
      </div>
    );
  }
}

LectureMedia.propTypes = {
  lecture: React.PropTypes.object.isRequired,
  getNextImageNames: React.PropTypes.func.isRequired
};

export default LectureMedia;
