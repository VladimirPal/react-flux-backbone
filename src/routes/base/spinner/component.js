import React from 'react';

export default React.createClass({
  render() {
    if (this.props.isShow) {
      return (
        <div className="middle-box text-center">
          <div className="sk-spinner sk-spinner-three-bounce">
            <div className="sk-bounce1"></div>
            <div className="sk-bounce2"></div>
            <div className="sk-bounce3"></div>
          </div>
          <i>{this.props.msg}</i>
        </div>
      );
    } else { return null; }
  }
});
