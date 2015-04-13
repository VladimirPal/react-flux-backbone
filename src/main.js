import React from 'react';
window.React = React;

import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;

import Application from './application/application';
import Router from './routes/routes'

let app = new Application();

let RootComponent = React.createClass({
  render() {
    return (
      <div>
        <div id="header-layout"></div>
        <div id="menu-layout"></div>
        <div id="main-layout"></div>
        <div id="footer-layout"></div>
      </div>
    );
  }
});

let appRoot = React.render(
    <RootComponent/>,
    document.getElementById('application')
  );

app.routes = new Router({
  container: document.getElementById('main-layout')
});
Backbone.history.start();
