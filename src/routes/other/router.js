import React from 'react';
import Router from '../../common/router';

import secondPage from './second/component';
import thirdPage from './third/component';

export default Router.extend({
  routes: {
    "second": "secondPageRoute",
    "third":  "thirdPageRoute"
  },

  secondPageRoute() {
    App.renderRoot({layout: secondPage("SecondPage")});
  },

  thirdPageRoute() {
    App.renderRoot({layout: thirdPage("ThirdPage")});
  }

});
