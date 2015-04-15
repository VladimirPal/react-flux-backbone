import React from 'react';
import Router from '../common/router'

import MainPageComponent from './main/component'

export default Router.extend({
  initialize(options) {
    this.container = options.container;
  },

  routes: {
    "":        "mainPageRoute",
    "test":    "testPageRoute"
  },

  mainPageRoute() {
    App.appRoot.setProps({layout: MainPageComponent})
  },

  testPageRoute() {
    App.appRoot.setProps({layout: MainPageComponent})
  }

});
