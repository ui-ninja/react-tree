import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Node from './Node';

import '../../styles/treeview.css';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selected: false
    };
  }

  /* 
    On select of node.    
  */
  select = (nodeID) => {
    this.setState((state) => ({ selected: !state.selected }));
    if (this.props.onNodeSelected && typeof this.props.onNodeSelected === 'function') {
      this.props.onNodeSelected(nodeID);
    }
  }

  toggle = (node) => {
    if (this.state.visible === false) {
        this.setState((state) => ({ visible: !state.visible }));
        // now execute node expanded function to let parent know
        if (this.props.onNodeExpand && typeof this.props.onNodeExpand === "function") {
          this.props.onNodeExpand(node.id);
        }
    } else {
      // node collapse requested
      // now set state to visible true
      this.setState((state) => ({ visible: !state.visible }));
      if (this.props.onNodeCollapse && typeof this.props.onNodeCollapse === "function") {
        this.props.onNodeCollapse(node.id);
      }
    }
  };

  updateChildNode(nodeID, data){
    if(nodeID != null){
      let node = this.getObject(this.props.node, nodeID, data);
      node.items.push(data);
      // execute parent function for onNodeChildrenDataLoaded
      if (this.props.onNodeChildrenDataLoaded && typeof this.props.onNodeChildrenDataLoaded === "function") {
        this.props.onNodeChildrenDataLoaded(nodeID);
      }
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
            result = theObject;
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
    let items,
      classObj;

    if (this.props.node.items != null) {
      items = this.props.node.items.map((node, index) => {
        return <li key={node.id}> <TreeNode node={node} onNodeExpand={this.props.onNodeExpand} onNodeCollapse={this.props.onNodeCollapse} onNodeSelected={this.props.onNodeSelected} onNodeChildrenDataLoaded={this.props.onNodeChildrenDataLoaded} /></li>
      });

      classObj = {
        togglable: true,
        "togglable-down": this.state.visible,
        "togglable-up": !this.state.visible
      };
    }

    let style;
    if (!this.state.visible) {
      style = { display: "none" };
    }

    return (
        <Node
          nodeItems={items}
          style={style}
          node={this.props.node}
          classObj={classObj}
          toggle={this.toggle}
          select={this.select}
          selected={this.state.selected} />
    );
  }
}

TreeNode.propTypes = {
  node: PropTypes.shape({
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

export default TreeNode;
