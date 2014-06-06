/**
 * Middlewares in blog module
 */

var renderError = require('../core/utils/template.js').renderError;
var ObjectId = require('mongoose').Types.ObjectId;

// Check the article id
// And asign it to req object
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
