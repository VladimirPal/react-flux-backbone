import React from 'react';
import Reflux from 'reflux';

let Button = require('react-bootstrap/lib/Button');
let Modal = require('react-bootstrap/lib/Modal');
let ModalTrigger = require('react-bootstrap/lib/ModalTrigger');

import BaseComponent from '../base/component';
import SpinnerComponent from '../base/spinner/component';
import ErrorComponent from '../base/errors/component';
import EmptyComponent from '../base/empty/component';

import Store from './store';
import Actions from './actions';

import ProfileStore from '../base/profile/store';

const ContactModal = React.createClass({
  render() {
    let contact = this.props.contactItem;

    return (
      <Modal {...this.props} className='inmodal' title={contact.get('name')} animation={true}>
        <div className='modal-body'>
          <ContactItemContent contactItem={contact} />
          <p className="text-center">Here can be additional information...</p>
        </div>
        <div className='modal-footer'>
          <Button onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    );
  }
});

let ContactItemContent = React.createClass({

  render() {
    let contact = this.props.contactItem;
    let contactImg = "http://lorempixel.com/79/79/cats/" + this.props.contactItem.id;

    return (
      <div>
        <div className="col-sm-4">
          <div className="text-center">
            <img className="img-circle m-t-xs img-responsive inl-bl" src={contactImg} />
            { this.props.showModal ?
              <ModalTrigger modal={<ContactModal contactItem={contact} />}>
                <a className="m-t-xs font-bold inl-bl">Graphics designer</a>
              </ModalTrigger> :
              <span className="m-t-xs font-bold inl-bl">Graphics designer</span>
            }
          </div>
        </div>
        <div className="col-sm-8">
          {this.props.showModal && <h3><strong>{contact.get('name')}</strong></h3>}
          <p><i className="fa fa-map-marker"></i> Riviera State 32/106</p>
          <address>
            <strong>Twitter, Inc.</strong><br/>
            795 Folsom Ave, Suite 600<br/>
            San Francisco, CA 94107<br/>
            <abbr title="Phone">P:</abbr> (123) 456-7890
          </address>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
});

let ContactItem = React.createClass({
  getInitialState() {
    return {showModal: false};
  },

  handleRemove() {
    Actions.delete(this.props.contactItem, true);
  },

  closeErrorHandle() {
    Actions.clearError(this.props.contactItem);
  },

  render() {
    let contact = this.props.contactItem;
    let profile = ProfileStore.getProfile();
    let isAdmin = profile.permission === 'admin';

    return (
      <div className="col-lg-4">
        <div className="contact-box">
          {
            (isAdmin && !contact.hasError) &&
            <div className="ibox-tools">
              <a onClick={this.handleRemove} className="close-link"><i className="fa fa-times"></i></a>
            </div>
          }
          {
            contact.hasError ? <ErrorComponent msg={contact.errorMsg} isShow={true} closeBtn={true} closeHandle={this.closeErrorHandle}/> :
            <ContactItemContent showModal={true} contactItem={contact} />
          }
        </div>
      </div>
    );
  }
});

let PageComponent = React.createClass({
  mixins: [Reflux.connect(Store)],

  componentWillMount() {
    Actions.setType(this.props.pageType);
    Actions.load();
  },

  componentWillUnmount() {
    Actions.clear();
  },

  componentWillReceiveProps(nextProps) {
    Actions.setType(nextProps.pageType);
    Actions.load();
  },

  render() {
    let contacts = this.state.contacts;
    return (
      <div className="wrapper wrapper-content">
        <div className="row">
          <SpinnerComponent msg={"Fake delay..."} isShow={!contacts.isLoaded}/>
          <ErrorComponent msg={contacts.errorMsg} isShow={contacts.isLoaded && !contacts.isSuccess} cls={"middle-box"}/>
          <EmptyComponent msg={"Your contact list is empty"} isShow={contacts.isLoaded && contacts.isSuccess && !contacts.items.length}/>
          {
            contacts.isSuccess && contacts.items.map( (item, key) => {
              return (
              <ContactItem
                key={key}
                contactItem={item}
              />
              );
            })
          }
        </div>
      </div>
    );
  }
});

export default (active, pageType="default") => {
  return (
    <BaseComponent active={active}>
      <PageComponent pageType={pageType}/>
    </BaseComponent>
  );
};
