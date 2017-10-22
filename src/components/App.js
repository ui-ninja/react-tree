import React, { Component } from 'react';

import TreeNode from './tree-view/TreeNode';
import Loader from './Loader';

import { INITIAL_TREE_DATA } from '../data/initial-tree-data';

import '../styles/common.css';
import '../styles/treeview.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      treeData: null
    }
    this.onExpand = this.onExpand.bind(this);
    this.onCollapse = this.onCollapse.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onChildDataLoaded = this.onChildDataLoaded.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.counter = 0; //for demo purpose only
  }

  componentDidMount() {
    // here we can make a xhr call to fetch data from server.
    // for demo it comes from another static file.
    this.setState({
      treeData: INITIAL_TREE_DATA
    })
  }

  /* 
    events returned from Tree View Component.
  */
  onExpand = (nodeID) => {
    this.setState({
      loading: true
    });
    this.fetchItemById(nodeID)
      .then((data) => {
        this.refs.tree.updateChildNode(nodeID, data);
      }).catch(err => console.log("Error fetching child data for node id", nodeID));
    console.log("PARENT APP COMP -> Node" + nodeID + " expanded");
  }
  onCollapse = (nodeID) => {
    console.log("PARENT APP COMP -> Node" + nodeID + " collapsed");
  }
  onSelect = (nodeID) => {
    console.log("PARENT APP COMP -> Node" + nodeID + " selected");
  }
  onChildDataLoaded = (nodeID) => {
    console.log("PARENT APP COMP -> Data for Node" + nodeID + " loaded");
    this.setState({
      loading: false
    });
  }

  /*
   * API invocation
  */
  updateConfig = (treeID, data) => {
    this.refs.tree.updateConfig(treeID, data);
  }

  /*
    Helper function for simulating ajax call
  */
  wait = (delay, value) => {
    return new Promise(resolve => setTimeout(resolve, delay, value));
  }

  /*
    Fetch child of node
  */
  async fetchItemById(nodeID) {
    console.log("fetching items for " + nodeID);
    this.counter++;
    // here xhr call can be made to fetch new data
    let dummyData = null;
    if(this.counter <= 3){
      dummyData = {
        "type": 'structure-group',
        "id": "197-888-" + Math.floor(Math.random() * 100) + 1,
        "title": "Child Data node"+ this.counter,
        "items": []
      }
    }else{
      dummyData = {
        "type": 'page',
        "id": "197-888-" + Math.floor(Math.random() * 100) + 1,
        "title": "Last Child Data node"+ this.counter,
        "items": []
      }
    }
    try {
      let newData = await this.wait(2000, dummyData);
      return newData;
    } catch (err) {
      console.log("Error fetching data for node. Error description=> ", err);
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.treeData &&
          <TreeNode
            ref="tree"
            node={this.state.treeData.items[0]}
            loading={this.state.loading}
            onNodeExpand={this.onExpand}
            onNodeCollapse={this.onCollapse}
            onNodeSelected={this.onSelect}
            onNodeChildrenDataLoaded={this.onChildDataLoaded} />
        }
        <div className="loading-block">
          {this.state.loading &&
            <Loader />
          }
        </div>
      </div>
    );
  }
}

export default App;