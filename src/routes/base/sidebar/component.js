import _ from 'lodash'
import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';

import Store from './store'
import Actions from './actions'

let MenuItem = React.createClass({
  handleClick(event) {
    if (!this.props.menuItem.href) {
      event.preventDefault();
    }
    Actions.switchOpen(this.props.menuItem);
  },

  render() {
    let menuItem = this.props.menuItem;
    let menuItems = [];

    let ulClasses = cx({
      "nav nav-second-level": true,
      "menu-expanded": menuItem.isOpen
    });

    let liClasses = cx({
      "active": menuItem.isActive,
      "is-open": menuItem.isOpen
    });

    return (
      <li className={liClasses}>
        <a href={menuItem.href} onClick={this.handleClick}>
          {menuItem.icon && <i className={menuItem.icon}></i>}
          <span className="nav-label">{menuItem.name}</span>
          {menuItem.childrens && <span className="fa arrow"></span>}
        </a>
        <ul ref="ul" className={ulClasses}>
          { menuItem.childrens &&
            menuItem.childrens.map( (item, key) => {
              return (
                <MenuItem
                  key={key}
                  menuItem={item}
                />
              );
            })
          }
        </ul>
      </li>
    );
  }
});

export default React.createClass({
  mixins: [Reflux.connect(Store)],

  render() {
    return (
      <nav className="navbar-default navbar-static-side">
        <div className="sidebar-collapse">
          <ul className="nav">
            {
              this.state.menuItems.map( (item, key) => {
                return (
                  <MenuItem
                    key={key}
                    menuItem={item}
                  />
                );
              })
            }
          </ul>
        </div>
      </nav>
    );
  }
});
