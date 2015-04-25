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
  },

  onClear() {
    this.reset();
    this.updateList();
  },

  onClearError(item) {
    item.hasError = false;
    this.updateList();
  },

  onLoad(needClear=false) {
    if (needClear) {
      Actions.clear();
    }
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

  onSave(model, data) {
    this.save(model, data);
  },

  onSaveFailure(model, response) {
    this.failureSave(model, response);
    this.trigger({model: model, response: response});
  },

  onSaveCompleted(model, response) {
    this.completedSave(response);
    this.trigger({model: model, response: response});
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

  updateList(data=this[this.stateName]) {
    this.trigger(data);
  }
});
