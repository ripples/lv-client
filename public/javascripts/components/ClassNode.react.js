/**
 * Created by igor on 6/9/16.
 */
import  React from 'react';
var ReactPropTypes = React.PropTypes;
import  LectureActions from '../actions/LectureAction';


export default class ClassNode extends React.Component {
    constructor() {
        super();
        this.state = {
            show: true
        }
    }

    changeDisplay() {
        LectureActions.filter(this.props.classname);
        this.setState({show: !this.state.show});
    }

    render() {
        return (
            <div className="classContainer">
                <h5 className="classHeader">
                    {this.props.classname}
                </h5>
                <span className="classShowSpan" onClick={this.changeDisplay}>
                  {(this.state.show) ? "hide" : "show"}
                </span>
            </div>
        );
    }

}