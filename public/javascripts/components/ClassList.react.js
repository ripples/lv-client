/**
  * ClassList will have one sub-class of Class
  * This design will allow for the cascading of stateful class
  * information to update the view.
**/


import  React from 'react';

var  ReactPropTypes = React.PropTypes;
import ClassNode from './ClassNode.react';


export default class ClassList extends React.Component{
    constructor(){
        super();
        console.log('built ClassList');
    }

    render (){
        var classNodes = this.props.classes.map(function(obj, index){
            return(
                <ClassNode key= {index} classname = {obj}/>
            )
        });
        return(
            <div className = "ClassList">
                {classNodes}
            </div>
        )
    }
}

