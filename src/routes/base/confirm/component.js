import React from 'react';

let OverlayMixin = require('react-bootstrap/lib/OverlayMixin');

let Modal = require('react-bootstrap/lib/Modal');
let Button = require('react-bootstrap/lib/Button');

export default React.createClass({
  mixins: [OverlayMixin],

  getInitialState() {
    return {
      isModalOpen: false
    };
  },

  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  confirmAction() {
    this.handleToggle();
    this.props.confirmAction();
  },


  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }
    let title = this.props.title || '';
    let confirmMsg = this.props.confirmMsg || 'Are you sure?';

    return (
      <Modal title={title} onRequestHide={this.handleToggle}>
        <div className='modal-body'>
          <p>{confirmMsg}</p>
        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleToggle}>Close</Button>
          <a onClick={this.confirmAction} className="btn btn-danger btn-ok">Confirm</a>
        </div>
      </Modal>
    );
  },

  render() {
    let child = React.Children.only(this.props.children);
    return React.cloneElement(child, {
      onClick: this.handleToggle
    });
  }
});
