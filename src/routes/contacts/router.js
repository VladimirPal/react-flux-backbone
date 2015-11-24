import React from 'react';
import Router from '../../common/router';

import authCheck from '../../common/auth-check';

import contactsPage from '../contacts/component';

export default Router.extend({
  routes: {
    "":                     "contactsPageRoute",
    "contacts-with-error":  "contactsErrorPageRoute",
    "contacts-empty-list":  "contactsEmptyPageRoute"
  },

  contactsPageRoute() {
    App.renderRoot({layout: contactsPage("contacts")});
  },

  contactsErrorPageRoute() {
    App.renderRoot({layout: contactsPage("contacts-error", "contacts-error")});
  },

  contactsEmptyPageRoute() {
    App.renderRoot({layout: contactsPage("contacts-empty", "contacts-empty")});
  }
});
