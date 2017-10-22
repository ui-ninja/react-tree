import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import TreeView from './tree-view/TreeView';


describe('<AppComponent />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

})