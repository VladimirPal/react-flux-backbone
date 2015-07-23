import React from 'react';

import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;

import Application from './application/application';
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

import LoginRouter from './routes/login/router';
import ContactsRouter from './routes/contacts/router';
import OtherRouter from './routes/other/router';
import authCheck from './common/auth-check';

app.loginRouter = new LoginRouter();
app.contactsRouter = new ContactsRouter(authCheck);
app.otherRouter = new OtherRouter(authCheck);

Backbone.history.start();
