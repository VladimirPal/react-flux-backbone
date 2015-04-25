import $ from 'jquery';
import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';

import ValidateMixin from '../../common/validate-mixin';
let OverlayMixin = require('react-bootstrap/lib/OverlayMixin');

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


export default (active, pageType="default") => {
  let header = () => {
    if (pageType === "default") {
      return (<HeaderComponent/>);
    } else { return null; }
  };

  return (
    <BaseComponent header={header()} active={active}>
      <PageComponent pageType={pageType}/>
    </BaseComponent>
  );
};


let HeaderComponent = React.createClass({
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

  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    return (<ContactFormModal onRequestHide={this.handleToggle} contactItem={Store.getNewItem()}/>);
  },

  render() {
    return (
      <div className="navbar-header">
        <a onClick={this.handleToggle} className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#">Add new contact</a>
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
    Actions.load(true);
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
              <ModalTrigger modal={<ContactFormModal contactItem={contact}/>}>
                <a href="#"><i className="fa fa-edit"></i></a>
              </ModalTrigger>
              <a onClick={this.handleRemove}><i className="fa fa-times"></i></a>
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
          <p><i className="fa fa-map-marker"></i> Some address 32/106</p>
          <address>
            <strong>Some Company, Inc.</strong><br/>
            <p>Some additional info</p>
          </address>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
});


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


const ContactFormModal = React.createClass({
  mixins: [ValidateMixin, Reflux.listenTo(Store, "onFinishedSave")],

  getInitialState() {
    return {
      formError: null,
      errors: {},
      fields: {
        name: ['required']
      }
    };
  },

  onFinishedSave(data) {
    if (data.model.errorMsg) {
      this.setState({formError: data.model.errorMsg});
    } else {
      this.props.onRequestHide();
    }
  },

  handleChange(event) {
    let validateObj = {};
    let fieldName = event.target.name;

    validateObj[fieldName] = this.state.fields[fieldName];
    let res = this.validate(validateObj);
    this.setState({errors: res.errors});
  },

  handleSubmit(event) {
    event.preventDefault();
    let res = this.validate();

    if (Object.keys(res.errors).length !== 0) {
      this.setState({errors: res.errors});
    } else {
      let data = this.getData();
      Actions.save(this.props.contactItem, data);
    }
  },

  render() {
    let errors = this.state.errors;
    let item = this.props.contactItem;

    let nameClasses = cx({
      "form-group": true,
      "has-error": errors.name
    });

    return (
      <Modal {...this.props} className='inmodal' title={"New contact"} animation={true} onRequestHide={this.props.onRequestHide}>
        <form onSubmit={this.handleSubmit} role="form">
          <div className='modal-body'>
            <div className={nameClasses}>
              <label>Name</label>
              <label className="error">{errors.name}</label>
              <input ref="name" name="name" type="text" placeholder="Enter name"
                onChange={this.handleChange} defaultValue={item.get('name')} className="form-control"/>
            </div>
            <p>It's a simple sample form, only name</p>
            <ErrorComponent msg={item.errorMsg} isShow={item.errorMsg}/>
          </div>
          <div className='modal-footer'>
            <Button bsStyle='success' type="submit">Save</Button>
            <Button onClick={this.props.onRequestHide}>Close</Button>
          </div>
        </form>
      </Modal>
    );
  }
});
