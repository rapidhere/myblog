var renderError = require('../core/utils/template.js').renderError;

exports.index = function(req, res, next) {
	renderError(req, res, "<p>由于近期服务器后台发现BUG，最近又无暇维护，现已暂时关闭BLOG</p>");
};
