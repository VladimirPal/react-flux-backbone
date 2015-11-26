import React from 'react';
import Router from '../../common/router';

import loginPage from './component';

export default Router.extend({
  routes: {
    "login":  "loginPageRoute",
    "logout": "logoutPageRoute"
  },

  loginPageRoute() {
    App.renderRoot({layout: loginPage()});
  },

  logoutPageRoute() {
    window.localStorage.removeItem('accessToken');
    window.location.replace('#/login');
  }
});
