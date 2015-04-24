import React from 'react';
import Reflux from 'reflux';
import SidebarComponent from './sidebar/component';
import ContentComponent from './content/component';
import SpinnerComponent from '../base/spinner/component';
import SidebarActions from '../base/sidebar/actions';

import Store from './profile/store';
import Actions from './profile/actions';

export default React.createClass({
  mixins: [Reflux.connect(Store)],

  getInitialState() {
    Actions.load();
  },

  render() {
    let profile = this.state.profile;

    if (profile.isLoaded) {
      if (this.props.active) {
        SidebarActions.setActive(this.props.active);
      }
      return (
        <div id="wrapper">
          <SidebarComponent/>
          <ContentComponent
            header={this.props.header}
            mainPage={this.props.children}/>
        </div>
      );
    } else {
      return (
        <SpinnerComponent isShow={true}/>
      );
    }
  }
});
