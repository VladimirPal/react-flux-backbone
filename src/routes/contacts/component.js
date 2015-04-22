import React from 'react';
import Reflux from 'reflux';
import BaseComponent from '../base/component';
import SpinnerComponent from '../base/spinner/component';
import ErrorComponent from '../base/errors/component';
import EmptyComponent from '../base/empty/component';

import Store from './store';
import Actions from './actions';


let ContactItemComponent = React.createClass({
  render() {
    let contact = this.props.contactItem;
    let contactImg = "http://lorempixel.com/79/79/cats/" + this.props.id;

    return (
      <div className="col-lg-4">
        <div className="contact-box">
          <a href="#">
            <div className="col-sm-4">
              <div className="text-center">
                <img className="img-circle m-t-xs img-responsive" src={contactImg} />
                <div className="m-t-xs font-bold">Graphics designer</div>
              </div>
            </div>
            <div className="col-sm-8">
              <h3><strong>{contact.name}</strong></h3>
              <p><i className="fa fa-map-marker"></i> Riviera State 32/106</p>
              <address>
                <strong>Twitter, Inc.</strong><br/>
                795 Folsom Ave, Suite 600<br/>
                San Francisco, CA 94107<br/>
                <abbr title="Phone">P:</abbr> (123) 456-7890
              </address>
            </div>
            <div className="clearfix"></div>
          </a>
        </div>
      </div>
    );
  }
});

let PageComponent = React.createClass({
  mixins: [Reflux.connect(Store)],

  render() {
    let contacts = this.state.contacts;
    return (
      <div className="wrapper wrapper-content">
        <div className="row">
          <SpinnerComponent msg={"Fake delay..."} isShow={!contacts.isLoaded}/>
          <ErrorComponent msg={contacts.errorMsg} isShow={contacts.isLoaded && !contacts.isSuccess}/>
          <EmptyComponent msg={"Your contact list is empty"} isShow={contacts.isLoaded && contacts.isSuccess && !contacts.items.length}/>
          {
            contacts.isSuccess && contacts.items.map( (item, key) => {
              return (
              <ContactItemComponent
                key={key}
                id={key}
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

let beforeLoad = (pageType) => {
  Actions.setType(pageType);
  Actions.load();
};

export default (active, pageType="default") => {
  let argsForLoad = [pageType];
  return (
    <BaseComponent
      loadCallback={beforeLoad}
      loadCallbackArgs={argsForLoad}
      active={active}
    >
      <PageComponent pageType={pageType}/>
    </BaseComponent>
  );
};
