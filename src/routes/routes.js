import React from 'react';
import Router from '../common/router';

import authCheck from '../common/auth-check';

import loginPage from './login/component';
import contactsPage from './contacts/component';
import secondPage from './second/component';
import thirdPage from './third/component';

import SidebarActions from './base/sidebar/actions';

export default Router.extend({
  routes: {
    "":                     "contactsPageRoute",
    "login":                "loginPageRoute",
    "logout":               "logoutPageRoute",
    "contacts-with-error":  "contactsErrorPageRoute",
    "contacts-empty-list":  "contactsEmptyPageRoute",
    "second":               "secondPageRoute",
    "third":                "thirdPageRoute"
  },

  loginPageRoute() {
    App.appRoot.setProps({layout: loginPage()});
  },

  logoutPageRoute() {
    window.localStorage.removeItem('accessToken');
    window.location.replace('#/login');
  },

  contactsPageRoute() {
    if (authCheck()) {
      App.appRoot.setProps({layout: contactsPage("contacts")});
    }
  },

  contactsErrorPageRoute() {
    if (authCheck()) {
      App.appRoot.setProps({layout: contactsPage("contacts-error", "contacts-error")});
    }
  },

  contactsEmptyPageRoute() {
    if (authCheck()) {
      App.appRoot.setProps({layout: contactsPage("contacts-empty", "contacts-empty")});
    }
  },

  secondPageRoute() {
    if (authCheck()) {
      App.appRoot.setProps({layout: secondPage("SecondPage")});
    }
  },

  thirdPageRoute() {
    if (authCheck()) {
      App.appRoot.setProps({layout: thirdPage("ThirdPage")});
    }
  }

});
