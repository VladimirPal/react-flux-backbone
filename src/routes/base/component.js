import React from 'react';
import SidebarComponent from './sidebar/component'

export default React.createClass({
  render() {
    let menuItems = [
      {
        name: "First menu item",
        icon: "fa fa-th-large",
        href: "#", childrens: [
          {name: "SubMenu item", href: "#"},
          {name: "SubMenu item", href: "#"}
        ]
      },
      {name: "Second menu item", href: "#"},
      {
        name: "Third menu item",
        href: "#",
        childrens: [
          {name: "SubMenu item", href: "#"},
          {name: "SubMenu item", href: "#"}
        ]
      }
    ];
    return (
      <div id="wrapper">
        <SidebarComponent menuItems={menuItems}/>
         {this.props.children}
      </div>
    );
  }
});
