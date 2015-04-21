import React from 'react';
import Router from '../common/router';

import contactsPage from './contacts/component';
import secondPage from './second/component';
import thirdPage from './third/component';

import SidebarActions from './base/sidebar/actions';

export default Router.extend({
  routes: {
    "":                     "contactsPageRoute",
    "contacts-with-error":  "contactsErrorPageRoute",
    "contacts-empty-list":  "contactsEmptyPageRoute",
    "second":               "secondPageRoute",
    "third":                "thirdPageRoute"
  },

  contactsPageRoute() {
    App.appRoot.setProps({layout: contactsPage()});
    SidebarActions.setActive("contacts");
  },

  contactsErrorPageRoute() {
    App.appRoot.setProps({layout: contactsPage("contacts-error")});
    SidebarActions.setActive("contacts-error");
  },

  contactsEmptyPageRoute() {
    App.appRoot.setProps({layout: contactsPage("contacts-empty")});
    SidebarActions.setActive("contacts-empty");
  },


  secondPageRoute() {
    SidebarActions.setActive("SecondPage");
    App.appRoot.setProps({layout: secondPage()});
  },

  thirdPageRoute() {
    SidebarActions.setActive("ThirdPage");
    App.appRoot.setProps({layout: thirdPage()});
  }

});
