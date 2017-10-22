import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import ErrorBoundary from './components/common/ErrorBoundary';

import registerServiceWorker from './registerServiceWorker';

export class TreeApp {
  constructor() {
    this.isRendered = false;
    this.reactInstance = null;
  }

  render() {
    if (!this.isRendered) {
      this.reactInstance = ReactDOM.render(
        <ErrorBoundary>
        <App />
      </ErrorBoundary>, document.getElementById('root'));

      registerServiceWorker();
      this.isRendered = true;
    }

    return this;
  }

  destroy() {
    if (this.isRendered) {
      ReactDOM.unmountComponentAtNode(document.getElementById('root'));
      this.reactInstance = null;
      this.isRendered = false;
    }
  }
}

window.component = new TreeApp();
window.component.render();
