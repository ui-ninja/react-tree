import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createReduxStore } from './store/store';
import INITIAL_STATE from './reducers/initial-state';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { loadProductList } from './actions/product-list';

export class ProductsApp {
  constructor() {
    this.isRendered = false;
    this.reactInstance = null;
    const initialState = { ...INITIAL_STATE };

    this.store = createReduxStore(initialState);
    this.store.dispatch(loadProductList());
  }

  /**
  * Renders the component in the root element given via configuration
  * (config.root) if the component is not yet rendered.
  *
  * @return {ProductsApp} instance of this component.
  * @public
  */
  render() {
    if (!this.isRendered) {
      this.reactInstance = ReactDOM.render(
        <Provider store={this.store}>
          <Router>
            <Route exact path="/" component={App} />
          </Router>
        </Provider>,
        document.getElementById('root'));

      registerServiceWorker();
      this.isRendered = true;
    }

    return this;
  }

  /**
  * Destroys this component.
  *
  * @public
  */
  destroy() {
    if (this.isRendered) {
      ReactDOM.unmountComponentAtNode(document.getElementById('root'));
      this.reactInstance = null;
      this.isRendered = false;
    }
  }
}

window.component = new ProductsApp();
window.component.render();
