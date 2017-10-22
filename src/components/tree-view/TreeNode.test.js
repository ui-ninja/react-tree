import React from 'react';
import { mount, shallow } from 'enzyme';

import TreeNode from './TreeNode';
import Node from './Node';

const initialTreeData = {
  "id": "tcm:0-184-1",
  "items": [
    {
      "type": 'structure-group',
      "id": "179-7497-1",
      "title": "Root",
      "async": false,
      "items": [
        {
          "type": 'structure-group',
          "id": "179-7497-2",
          "title": ".COM",
          "async": false,
          "items": [
            {
              "type": 'structure-group',
              "id": "179-7497-3",
              "title": "AUTOTEST",
              "async": false,
              "items": [
                {
                  "type": 'page',
                  "id": "179-7497-4",
                  "title": "First LEAF OF AUTOTEST",
                  "async": false
                },
                {
                  "type": 'structure-group',
                  "id": "179-7497-5",
                  "title": "AUTOTEST-ASYNC",
                  "async": true,
                  "items": []
                }
              ]
            },
            {
              "type": 'page',
              "id": "179-7497-6",
              "title": "DEVTEST",
              "async": false
            },
            {
              "type": 'structure-group',
              "id": "179-7497-7",
              "title": "ASYNC",
              "async": true,
              "items": []
            }
          ]
        }
      ]
    }
  ]
}

describe('Test cases for <TreeNodeComponent />', () => {

  it('should select a node', () => {
    const wrapper = mount(
      <TreeNode node={initialTreeData} />
    )
    wrapper.find('.node-not-selected').first().simulate('click');
    expect(wrapper.state('selected')).toBe(true);
  })

  it('should expand a node', () => {
    const wrapper = mount(
      <TreeNode node={initialTreeData} />
    )
    wrapper.find('.togglable').first().simulate('click');
    expect(wrapper.find('.togglable').first().hasClass('togglable-down')).toBe(true);
  })

  it('should collapse a node', () => {
    const wrapper = mount(
      <TreeNode node={initialTreeData} />
    )
    wrapper.find('.togglable-up').first().simulate('click');
    // twice cuz first time it will always be .togglable-down
    wrapper.find('.togglable-down').first().simulate('click');
    expect(wrapper.find('.togglable').first().hasClass('togglable-up')).toBe(true);
  })

});