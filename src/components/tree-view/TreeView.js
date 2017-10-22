import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';

import '../../styles/treeview.css';

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: props.nodeData
    }
    this.onExpand = this.onExpand.bind(this);
    this.onCollapse = this.onCollapse.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onChildDataLoaded = this.onChildDataLoaded.bind(this);
  }

  /* 
    events
  */
  onExpand = (nodeID) => {
    if (this.props.onNodeExpand && typeof this.props.onNodeExpand === "function") {
      this.props.onNodeExpand(nodeID);
    }
  }
  onCollapse = (nodeID) => {
    if (this.props.onNodeCollapse && typeof this.props.onNodeCollapse === "function") {
      this.props.onNodeCollapse(nodeID);
    }
  }
  onSelect = (nodeID) => {
    if (this.props.onNodeSelected && typeof this.props.onNodeSelected === 'function') {
      this.props.onNodeSelected(nodeID);
    }
  }
  onChildDataLoaded = (node) => {
    if (this.props.onNodeChildrenDataLoaded && typeof this.props.onNodeChildrenDataLoaded === "function") {
      this.props.onNodeChildrenDataLoaded(node);
    }
  }

  /* 
    API Methods
  */
  updateConfig = (treeID, data) => {
    if (treeID === null || treeID === "undefined") {
      return;
    }
    if (treeID === this.state.treeData.id) {
      console.log("ID for both the tree data is same");
      return;
    }
    this.setState({
      treeData: data
    }, console.log("Config updated"));
  }

  updateChildNode = (nodeID, childData) => {
    var result = this.getObject(this.state.treeData.items, nodeID, childData);
    if (result !== null) {
      this.setState({
        treeData: result
      }, console.log("Node with ID " + nodeID + " is now updated."))
    } else {
      console.warn('No ID with value ' + nodeID + ' found. Please check the id of node you want to update');
    }
  }

  /*
    recursion method to get the child from nested object.
    update state of data to reflect it on tree view
  */
  getObject = (theObject, nodeID, childData) => {
    var result = null;

    if (theObject instanceof Array) {
      for (var i = 0; i < theObject.length; i++) {
        if (result != null) {
          break;
        }
        result = this.getObject(theObject[i], nodeID, childData);
      }
    }
    else {
      for (var prop in theObject) {
        if (prop === 'id') {
          if (theObject[prop] === nodeID) {
            theObject.items.length = 0;
            theObject.items.push(childData);
            result = this.state.treeData;
            return result;
          }
        }
        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array)
          result = this.getObject(theObject[prop], nodeID, childData);
      }
    }
    return result;
  }

  render() {
    return (
      <div className="container">
        <TreeNode
          node={this.state.treeData.items[0]}
          onNodeExpand={this.onExpand}
          onNodeCollapse={this.onCollapse}
          onNodeSelected={this.onSelect}
          onNodeChildrenDataLoaded={this.onChildDataLoaded} />
      </div>
    );
  }
}

TreeView.propTypes = {
  nodeData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        async: PropTypes.bool,
        items: PropTypes.array
      })
    )
  }),
  onNodeExpand: PropTypes.func,
  onNodeCollapse: PropTypes.func,
  onNodeSelected: PropTypes.func,
  onNodeChildrenDataLoaded: PropTypes.func
}

export default TreeView;