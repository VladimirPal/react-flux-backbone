import Backbone from 'backbone';
import _ from 'lodash';


export default Backbone.Router.extend({
  initialize(authCb) {
    this.authCb = authCb;
  },

  route(route, name, callback) {
    if (!_.isRegExp(route)) {
      route = this._routeToRegExp(route);
    }
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) {
      callback = this[name];
    }
    let router = this;
    Backbone.history.route(route, function(fragment) {
      let args = router._extractParameters(route, fragment);
      let block = true;

      if (router.authCb) {
        if (router.authCb.apply(router, [name, callback, args]) === false) {
          return;
        }
      }

      if (router.before) {
        block = router.before.apply(router, [name, callback, args]);
      }

      if (block === false) {
        return;
      }

      router.execute(callback, args);
      router.trigger.apply(router, ['route:' + name].concat(args));
      router.trigger('route', name, args);

      if (router.after) {
        router.after.apply(router, [name, callback, args]);
      }

      Backbone.history.trigger('route', router, name, args);
    });
    return this;
  }
});
