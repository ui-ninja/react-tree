import React from 'react';
import { shallow } from 'enzyme';

import TreeView from './TreeView';

describe('<TreeView /> Component', () => {
  const oldNodeData = {
    "id": "tcm:0-old-184",
    "items": [
      {
        "type": 'structure-group',
        "id": "179-old-1",
        "title": "oldRoot",
        "async": false,
        "items": [
          {
            "type": 'page',
            "id": "179-old-2",
            "title": "old-.COM",
            "async": false
          }
        ]
      }
    ]
  }
  const newNodeData = {
    "id": "tcm:0-new-184",
    "items": [
      {
        "type": 'structure-group',
        "id": "179-new-1",
        "title": "new-Root",
        "async": false,
        "items": [
          {
            "type": 'page',
            "id": "179-new-2",
            "title": "new-.COM",
            "async": false
          }
        ]
      }
    ]
  }


  const newChildData = {
    "type": 'page',
    "id": "179-new-2",
    "title": "new-.COM",
    "async": false
  }

  it('should return updated config', () => {
    const component = shallow(<TreeView nodeData={oldNodeData} />);
    component.instance().updateConfig("tcm:0-184-2", newNodeData);
    let compState = component.state('treeData');
    expect(compState).toEqual(newNodeData);

  });

  it('should update the node with new fetched child items', () => {
    const component = shallow(<TreeView nodeData={oldNodeData} />);
    component.instance().updateChildNode("179-old-1", newChildData);
    let compNewChild = component.state('treeData').items[0].items[0];
    expect(compNewChild).toEqual(newChildData);
  })

})