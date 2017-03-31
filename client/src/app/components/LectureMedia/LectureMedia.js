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
            <ImageView imageSrc={(lecture.currentImages && lecture.currentImages.computer.full) ?
                BASE_URL + lecture.currentImages.computer.full : "/images/no-image-found.png"
              }
            />
            <ThumbnailControl thumbnails={lecture.currentImages.computer.thumbs}/>
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
