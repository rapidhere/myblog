/**
 * Some useful funcions
 */

var _ = require('underscore');
var mongoose = require('mongoose');
var logger = require('../core/logger.js').getLogger();

// Get a tag by tagname, if such tag doesn't exist, create a new one
var getTagOrCreate;
exports.getTagOrCreate = function(tag_name, callback) {
  if(! _.isString(tag_name)) {
    throw new Error('Require a string as tag name');
  }

  // get Tag model
  var Tag = mongoose.model('Tag');
  
  Tag.find({'tag_name': tag_name}, function(err, tags) {
    if(err) {
      // Call callback to handle err
      callback(err, tags);
    }

    // Too many tags
    // For this situations we log a debug error
    // And then ignore this
    if(tags.length > 1 ) {
      logger.logDebug('N/A', 'Multiple tag has a tag_name: ' + tag_name);
    }

    // No such tag, we create one
    if(tags.length === 0) {
      var tag = new Tag;
      tag.tag_name = tag_name;
      
      // save and call callback
      tag.save(callback);
    } else {
      // If we've got it, simply call the callback
      callback(err, tags[0]);
    }
  });
};
