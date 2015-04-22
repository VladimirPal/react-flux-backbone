import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top" role="navigation" style={{"marginBottom": "0"}}>
          <ul className="nav navbar-top-links navbar-right">
            <li><a href="#/logout"><i className="fa fa-sign-out"></i> Log out </a></li>
          </ul>
        </nav>
      </div>
    );
  }
});
