import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const Node = ({ nodeItems, node, classObj, style, toggle, select, selected, loading }) => {
  return (
    <div className="tree-node">
      <h3>
        {node.type === "structure-group" &&
          <span onClick={toggle.bind(this, node)} className={classNames(classObj)}></span>
        }
        <span className={selected ? 'node-selected' : 'node-not-selected'} onClick={select.bind(this, node.id)}>{node.title}</span>
      </h3>
      <ul style={style}>
        {nodeItems}
      </ul>
    </div>
  );
}

Node.propTypes = {
  nodeItems: PropTypes.array,
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    async: PropTypes.bool,
    items: PropTypes.array
  }),
  classObj: PropTypes.object,
  style: PropTypes.object,
  toggle: PropTypes.func,
  select: PropTypes.func,
  selected: PropTypes.bool,
  loading: PropTypes.bool
}

export default Node;