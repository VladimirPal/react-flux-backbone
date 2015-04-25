var Backbone = require('backbone');
var fixture = require('./fixture');
var collection = new Backbone.Collection(fixture);

module.exports = function(api) {
  api.route('/api/contacts')
    .get(function(req, res) {
      setTimeout(function() {
        res.json(collection);
      }, 1);
    })
    .post(function(req, res) {
      var lastId = collection.get(collection.length).id;
      var newFakeModel = new Backbone.Model({id: lastId+1, name: req.body.name});
      collection.add(newFakeModel);
      res.json(newFakeModel);
    });

  api.route('/api/contacts-empty-list')
    .get(function(req, res) {
      setTimeout(function() {
        res.json([]);
      }, 1);
    });


  api.route('/api/contacts-with-error')
    .get(function(req, res) {
      setTimeout(function() {
        res.status(500).json({ error: 'Error message' });
      }, 2000);
    });


  api.route('/api/contacts/:id')
    .get(function(req, res) {
      var model = collection.get(req.params.id);
      res.json(model);
    })
    .put(function(req, res) {
      var model = collection.get(req.params.id);
      model.set(req.body);
      res.json(model);
    })
    .delete(function(req, res) {
      if (req.params.id !== '2') {
        res.json({success: true});
      } else {
        res.status(500).json({ error: 'Sample error message' });
      }
    });
};
