import React from 'react';
import HeaderComponent from '../header/component';
import FooterComponent from '../footer/component';

export default React.createClass({
  render() {
    return (
      <div id="page-wrapper" className="gray-bg dashbard-1">
        <HeaderComponent additionalHeader={this.props.header}/>
        {this.props.mainPage}
        <FooterComponent/>
      </div>
    );
  }
});
