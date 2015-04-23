import Backbone from 'backbone';
import Reflux from 'reflux';
import Actions from './actions';
import BackboneMixin from '../../../common/backbone-model-mixin';

export default Reflux.createStore({
  mixins: [BackboneMixin],
  listenables: Actions,

  init() {
    this.stateName = 'profile';
  },

  getInitialState() {
    let initObj = this.initBackboneState();
    this.changeUrl('/api/profile');
    return initObj;
  },

  getProfile() {
    return this.profile.item.attributes;
  },

  onLoad() {
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
