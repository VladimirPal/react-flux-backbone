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
            this.listenables.load.failure(response);
          }
          this.loadCount -= 1;
        }
      }
    );
  },

  failureLoad(response) {
    let responseJSON = response.responseJSON;

    this[this.stateName].isSuccess = false;
    this[this.stateName].isLoaded = true;
    if (responseJSON && responseJSON.error) {
      this[this.stateName].errorMsg = responseJSON.error;
    } else {
      this[this.stateName].errorMsg = "Unknown error";
    }
  },

  completedLoad(collection, response) {
    this[this.stateName].isSuccess = true;
    this[this.stateName].isLoaded = true;
  },

  delete(model, backendDelete) {
    if (backendDelete) {
      model.destroy(
        {
          wait: true,
          success: (m, response) => {
            this.listenables.delete.completed(m, response);
          },
          error: (m, response) => {
            this.listenables.delete.failure(m, response);
          }
        }
      );
    } else {
      this[this.stateName].items.remove(model);
      this.listenables.delete.completed();
    }
  },

  failureDelete(model, response) {
    let responseJSON = response.responseJSON;

    model.hasError = true;
    if (responseJSON && responseJSON.error) {
      model.errorMsg = responseJSON.error;
    } else {
      model.errorMsg = "Unknown error";
    }
  }

};
