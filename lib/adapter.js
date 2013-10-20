/*---------------------------------------------------------------
  :: MemoryAdapter
  -> adapter

  This memory adapter is for development only!
---------------------------------------------------------------*/

var Database = require('./database');

module.exports = function () {

  var database = new Database();
  var adapter = {

    // Whether this adapter is syncable (yes)
    syncable: true,

    // How this adapter should be synced
    migrate: 'alter',

    // Allow a schemaless datastore
    defaults: {
      schema: false
    },

    // Save reference to collection so we have it
    registerCollection: function (collection, cb) {
      var config = collection.config;
      database.registerCollection(collection.identity, config, cb);
    },

    // Return attributes
    describe: function (collectionName, cb) {
      database.describe(collectionName, cb);
    },

    define: function (collectionName, definition, cb) {
      database.createCollection(collectionName, definition, cb);
    },

    drop: function (collectionName, cb) {
      database.dropCollection(collectionName, cb);
    },

    find: function (collectionName, options, cb) {
      database.select(collectionName, options, cb);
    },

    create: function (collectionName, values, cb) {
      database.insert(collectionName, values, cb);
    },

    update: function (collectionName, options, values, cb) {
      database.update(collectionName, options, values, cb);
    },

    destroy: function (collectionName, options, cb) {
      database.destroy(collectionName, options, cb);
    }

  };

  return adapter;
};
