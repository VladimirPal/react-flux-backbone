import Backbone from 'backbone';
import Reflux from 'reflux';
import Actions from './actions';
import BackboneMixin from '../../common/backbone-collection-mixin';

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

  onClear() {
    this.reset();
    this.updateList();
  },

  onClearError(item) {
    item.hasError = false;
    this.updateList();
  },

  onLoad() {
    this.fetch();
  },

  onLoadFailure(response) {
    this.failureLoad(response);
    this.updateList();
  },

  onLoadCompleted(collection, response) {
    this.completedLoad(response);
    this.updateList();
  },

  onDelete(model, backendDelete=false) {
    this.delete(model, backendDelete);
  },

  onDeleteCompleted(model, reponse) {
    this.updateList();
  },

  onDeleteFailure(model, response) {
    this.failureDelete(model, response);
    this.updateList();
  },

  updateList() {
    this.trigger(this[this.stateName]);
  }
});
