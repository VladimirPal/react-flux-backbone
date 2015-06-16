import Backbone from 'backbone';

export default {
  initBackboneState(url=false, defaults={}) {
    let Model = Backbone.Model.extend({
      defaults: defaults
    });
    this[this.stateName] = {
      isLoaded: false,
      item: new Model()
    };
    if (url) {
      this[this.stateName].item.url = url;
    }
    let returnObj = {};
    returnObj[this.stateName] = this[this.stateName];

    return returnObj;

  },

  reset() {
    this[this.stateName].isLoaded = false;
    this[this.stateName].item.reset();
  },

  changeUrl(url) {
    this[this.stateName].item.url = url;
  },

  fetch() {
    if (this.loadCount === undefined) {
      this.loadCount = 0;
    }
    this.loadCount += 1;
    this[this.stateName].item.fetch(
      {
        success: (collection, response) => {
          if (this.loadCount === 1) {
            this.listenables.load.completed(collection, response);
          }
          this.loadCount -= 1;
        },
        error: (collection, response) => {
          if (this.loadCount === 1) {
            this.onLoadFailed(response);
          }
          this.loadCount -= 1;
          // This bug should be fixed in new version
          // https://github.com/spoike/refluxjs/issues/296
          //Actions.load.failed(response);
        }
      }
    );
  },

  failed(response) {
    let responseJSON = response.responseJSON;

    this[this.stateName].isSuccess = false;
    this[this.stateName].isLoaded = true;
    if (responseJSON && responseJSON.error) {
      this[this.stateName].errorMsg = responseJSON.error;
    } else {
      this[this.stateName].errorMsg = "Unknown error";
    }
  },

  completed(collection, response) {
    this[this.stateName].isSuccess = true;
    this[this.stateName].isLoaded = true;
  },

  update(action=false, data=this[this.stateName]) {
    let response = {action: action};
    response[this.stateName] = this[this.stateName];
    this.trigger(response);
  }
};
