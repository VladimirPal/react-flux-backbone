import Backbone from 'backbone';
import Reflux from 'reflux';
import Actions from './actions';
import BackboneMixin from '../../common/backbone-store-mixin';

export default Reflux.createStore({
  mixins: [BackboneMixin],
  listenables: Actions,

  init() {
    this.stateName = 'contacts';
  },

  getInitialState() {
    return this.initBackboneState();
  },

  onSetType(type) {
    this.reset();
    switch (type) {
      case "default":
        this.changeUrl("/api/contacts");
        break;
      case "contacts-error":
        this.changeUrl("/api/contacts-with-error");
        break;
      case "contacts-empty":
        this.changeUrl("/api/contacts-empty-list");
        break;
    }
    this.updateList();
  },

  load() {
    this.fetch();
  },

  onLoadFailed(response) {
    this.failed(response);
    this.updateList();
  },

  onLoadCompleted(collection, response) {
    this.completed(response);
    this.updateList();
  },

  updateList() {
    this.trigger(this[this.stateName]);
  }
});
