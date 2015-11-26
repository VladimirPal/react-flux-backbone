import React from 'react';

let Modal = require('react-bootstrap/lib/Modal');
let Button = require('react-bootstrap/lib/Button');


export default React.createClass({
  getInitialState() {
    return {
      showModal: false
    };
  },

  showModal() {
    this.setState({ showModal: true });
  },

  closeModal() {
    this.setState({ showModal: false });
  },

  confirmAction() {
    this.closeModal();
    setTimeout(() => {
      this.props.confirmAction();
    }, 300);
  },

  render() {
    let child = React.Children.only(this.props.children);
    let childElement = React.cloneElement(child, {
      onClick: this.showModal
    });

    let title = this.props.title || '';
    let confirmMsg = this.props.confirmMsg || 'Are you sure?';

    return (
      <span>
        {childElement}
        <Modal title={title} show={this.state.showModal} onHide={this.closeModal}>
          <div className='modal-body'>
            <p>{confirmMsg}</p>
          </div>
          <div className='modal-footer'>
            <Button onClick={this.closeModal}>Close</Button>
            <a onClick={this.confirmAction} className="btn btn-danger btn-ok">Confirm</a>
          </div>
        </Modal>
      </span>
    );
  }
});
