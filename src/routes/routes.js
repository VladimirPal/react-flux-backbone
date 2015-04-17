import React from 'react';
import Router from '../common/router'

import MainPageComponent from './main/component'
import SecondPageComponent from './second/component'
import ThirdPageComponent from './third/component'

import SidebarActions from './base/sidebar/actions'

export default Router.extend({
  initialize(options) {
    this.container = options.container;
  },

  routes: {
    "":          "mainPageRoute",
    "second":    "secondPageRoute",
    "third":     "thirdPageRoute"
  },

  mainPageRoute() {
    SidebarActions.setActive("MainPage");
    App.appRoot.setProps({layout: MainPageComponent})
  },

  secondPageRoute() {
    SidebarActions.setActive("SecondPage");
    App.appRoot.setProps({layout: SecondPageComponent})
  },

  thirdPageRoute() {
    SidebarActions.setActive("ThirdPage");
    App.appRoot.setProps({layout: ThirdPageComponent})
  }


});
