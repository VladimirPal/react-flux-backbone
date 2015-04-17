import React from 'react';
import SidebarComponent from './sidebar/component'
import ContentComponent from './content/component'

export default React.createClass({
  render() {
    return (
      <div id="wrapper">
        <SidebarComponent/>
        {this.props.children}
        <ContentComponent/>
      </div>
    );
  }
});
