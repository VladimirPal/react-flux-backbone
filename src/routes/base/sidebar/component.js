import React from 'react';
import cx from 'classnames';

let MenuItem = React.createClass({
  getInitialState() {
    return {actvive: false, expanded: false};
  },

  handleClick(event) {
    this.setState({ active: !this.state.active, expanded: !this.state.active });
  },

  render() {
    let menuItem = this.props.menuItem;
    let menuItems = [];

    let ulClasses = cx({
      "nav nav-second-level": true,
      "menu-expanded": this.state.expanded
    });

    return (
      <li className={this.state.active ? 'active' : ''}>
        <a href={menuItem.href} onClick={this.handleClick}>
          {menuItem.icon && <i className={menuItem.icon}></i>}
          <span className="nav-label">{menuItem.name}</span>
          {menuItem.childrens && <span className="fa arrow"></span>}
        </a>
        <ul ref="ul" className={ulClasses}>
          { menuItem.childrens &&
            menuItem.childrens.map( (item, key) => {
              return (
                <MenuItem key={key} menuItem={item} />
              );
            })
          }
        </ul>
      </li>
    );
  }
});

export default React.createClass({
  render() {
    return (
      <nav className="navbar-default navbar-static-side">
        <div className="sidebar-collapse">
          <ul className="nav">
            {
              this.props.menuItems.map( (item, key) => {
                return (<MenuItem key={key} menuItem={item} />);
              })
            }
          </ul>
        </div>
      </nav>
    );
  }
});

