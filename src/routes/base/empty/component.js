import React from 'react';

export default React.createClass({
  render() {
    if (this.props.isShow) {
      return (
        <div className="middle-box text-center">
          {this.props.msg}
        </div>
      );
    } else { return null; }
  }
});
