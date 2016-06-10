/**
 * Created by igor on 6/10/16.
 */

import React from'react';
var ReactPropTypes = React.PropTypes;
import DialogBox from'./DialogBox.react';
import MediaAction from'../actions/MediaAction';
import MediaStore from'../stores/MediaStore';
import MediaView from'./MediaView.react';

export default class Lecture extends React.Component {
    onMediaChangeListener() {
        this.setState({
            dialogContent: this.generateMediaView({
                media: MediaStore.getCurrent(),
                primary: MediaStore.getPrimary()
            })
        });
    }

    generateMediaView(params) {
        return (
            <MediaView media={params.media}
                       primary={params.primary}></MediaView>
        )
    }

    constructor() {
        super();
        this.state = {
            dialogVisible: false,
            dialogContent: null
        };
    }

    focusLecture() {
        MediaAction.fetch();
        this.setState({dialogVisible: true});
    }


    unfocusLecture() {
        this.setState({dialogVisible: false});
    }


    componentDidMount() {
        MediaStore.addChangeListener(this.onMediaChangeListener);
    }


    componentWillUnmount() {
        MediaStore.removeChangeListener(this.onMediaChangeListener);
    }


    render() {
        return (
            <div className="lectureContainer">
                <h4 className="lectureHeader">
                    {this.props.lecture.course + " " + this.props.lecture.date.toLocaleDateString()}
                </h4>
        <span className="lectureDialogShowSpan" onClick={this.focusLecture}>
          view
        </span>
                <DialogBox visible={this.state.dialogVisible}
                           requestClose={this.unfocusLecture}
                           content={this.state.dialogContent}></DialogBox>
            </div>
        );
    }
}