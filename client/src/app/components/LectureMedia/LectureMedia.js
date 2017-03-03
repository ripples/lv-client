import React from "react";
import VideoView from "components/VideoView/VideoView";
import InputView from "components/InputView/InputView";
import ThumbnailControl from "components/ThumbnailControl/ThumbnailControl";
import {BASE_URL} from "../../constants/ApiConstants";

class LectureMedia extends React.Component {

  render() {
    let updateVideoTimeStamp = newTimeStamp => {
      this.props.updateVideoTimeStamp(this.props.lecture, newTimeStamp);
    };
    let lecture = this.props.lecture;
    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              videoSrc={`${BASE_URL}/media/${lecture.semester}/${lecture.courseId}/${lecture.lectureId}/video`}
              updateVideoTimeStamp={updateVideoTimeStamp}
            />
          </div>
        </div>
        <div className="container">
          <div className="video-wrapper">
            <InputView imageSrc={lecture.currentComputerImage ?
                BASE_URL + lecture.currentComputerImage : "/images/no-image-found.png"
              }
            />
            <ThumbnailControl/>
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
