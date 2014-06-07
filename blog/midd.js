/**
 * Middlewares in blog module
 */

var renderError = require('../core/utils/template.js').renderError;
var ObjectId = require('mongoose').Types.ObjectId;

// Check the article id
// And assign it to req object
var checkArticleId;
exports.checkArticleId = checkArticleId = function(req, res, next) {
  var aid = req.params.aid;

  if(aid === undefined) {
    renderError(req, res,
      '<p><strong>Article Error: </strong> Require a article id!</p>');
    return ;
  }
  
  try {
    aid = new ObjectId(aid);
  } catch(err) {
    renderError(req, res,
      '<p><strong>Article Error: </strong> Invalid article id!</p>');
    return ;
  }

  req.aid = aid;
  next();
};

// Check the tag id
// And assign it to req object
var checkTagId;
exports.checkTagId = checkTagId = function(req, res, next) {
  var tid = req.params.tid;

  if(tid === undefined) {
    renderError(req, res,
      '<p><strong>Tag Error: </strong> Require a tag id!</p>');
    return ;
  }

  try {
    tid = new ObjectId(tid);
  } catch(err) {
    renderError(req, res,
      '<p><strong>Tag Error: </strong> Invalid tag id!</p>');
    return ;
  }

  req.tid = tid;
  next();
};
