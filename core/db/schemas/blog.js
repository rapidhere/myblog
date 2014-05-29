/**
 * Schema difintions for Blog module
 *
 * As auth Schema module, we don't vaildate data in db level
 * We often do it in app and form level
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// The Article Tag
var TagSchema = new Schema({
  // The name of this tag
  'tag_name':  String,

  // and nothing else :)
}); 

// Register Article Tag Schema
var Tag = mongoose.model('Tag', TagSchema);

// Exports Schema and Model
exports.TagSchema = TagSchema;
exports.Tag = Tag;


// The Article
var ArticleSchema = new Schema({
  // The title of this Article
  'title': String,

  // The Relative Tags
  'tags': [TagSchema],

  // Publish date
  'pub_date': Date,

  // Modify date
  'modify_date': Date,

  // The Content
  'content': String,
});

// Register Article Schema
var Article = mongoose.model('Article', ArticleSchema);

// Exports
exports.Article = Article;
exports.ArticleSchema = ArticleSchema;
