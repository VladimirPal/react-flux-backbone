import React from 'react';
import SidebarComponent from './sidebar/component';
import ContentComponent from './content/component';

export default React.createClass({
  render() {
    return (
      <div id="wrapper">
        <SidebarComponent/>
        <ContentComponent mainPage={this.props.children}/>
      </div>
    );
  }
});
