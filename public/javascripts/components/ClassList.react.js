"use strict";

/**
 * ClassList will have one sub-class of Class
 * This design will allow for the cascading of stateful class
 * information to update the view.
 **/

import React from "react";

import ClassNode from "./ClassNode.react";

export default class ClassList extends React.Component {
  render() {
    const classNodes = this.props.classes.map((obj, index) => {
      return (
        <ClassNode key={index} classname={obj}/>
      );
    });
    return (
      <div className="ClassList">
        {classNodes}
      </div>
    );
  }
}

