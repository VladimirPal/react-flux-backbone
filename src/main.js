import React from 'react';

import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;

import Application from './application/application';
import Router from './routes/routes';
import BaseComponent from './routes/base/component';
import 'babel/polyfill';

let app = new Application();
app.initialize();
window.App = app;

let RootComponent = React.createClass({
  render() {
    if (this.props.layout) {
      return this.props.layout;
    } else {
     return React.DOM.div();
    }
  }
});

app.appRoot = React.render(
  <RootComponent/>,
  document.getElementById('application')
);

app.routes = new Router();
Backbone.history.start();
