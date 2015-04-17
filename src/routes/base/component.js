import React from 'react';
import SidebarComponent from './sidebar/component'
import ContentComponent from './content/component'

export default React.createClass({
  render() {
    let menuItems = [
      {
        name: "Main page",
        icon: "fa fa-th-large",
        childrens: [
          {id: "MainPage", name: "SubMenu item", href: "#/"},
          {name: "SubMenu item", href: "#"}
        ]
      },
      { id: "SecondPage", name: "Second menu item", href: "#/second"},
      {
        name: "Third menu item",
        childrens: [
          {id: "ThirdPage", name: "SubMenu item", href: "#/third"},
          {name: "SubMenu item", href: "#"}
        ]
      }
    ];
    return (
      <div id="wrapper">
        <SidebarComponent
          menuItems={menuItems}
          activeId={this.props.activeId}/>
          {this.props.children}
        <ContentComponent/>
      </div>
    );
  }
});
