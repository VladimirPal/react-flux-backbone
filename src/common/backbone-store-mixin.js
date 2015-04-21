import Backbone from 'backbone';

export default {
  initBackboneState() {
    this[this.stateName] = {
      isLoaded: false,
      items: new Backbone.Collection()
    };
    let returnObj = {};
    returnObj[this.stateName] = this[this.stateName];

    return returnObj;

  },

  reset() {
    this[this.stateName].isLoaded = false;
    this[this.stateName].items.reset();
  },

  changeUrl(url) {
    this[this.stateName].items.url = url;
  },

  fetch() {
    if (this.loadCount === undefined) {
      this.loadCount = 0;
    }
    this.loadCount += 1;
    this[this.stateName].items.fetch(
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
  }
};
