import React from 'react';

export default React.createClass({
  getInitialState() {
    return {isShow: true};
  },

  closeHandle() {
    this.setState({isShow: false});
    if (this.props.closeHandle) {
      this.props.closeHandle();
    }
  },

  render() {
    if (this.props.isShow && this.state.isShow) {
      let cls = "text-center ";
      if (this.props.cls) {
        cls += this.props.cls;
      }
      return (
        <div className={cls}>
          <div className="alert alert-danger alert-dismissable">
            {this.props.closeBtn && <button onClick={this.closeHandle} className="close">×</button>}
            {this.props.msg}
          </div>
        </div>
      );
    } else { return null; }
  }
});
