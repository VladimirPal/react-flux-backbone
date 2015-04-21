import React from 'react';

export default React.createClass({
  render() {
    if (this.props.isShow) {
      return (
        <div className="middle-box text-center">
          <div className="alert alert-danger">
            {this.props.msg}
          </div>
        </div>
      );
    } else { return null; }
  }
});
