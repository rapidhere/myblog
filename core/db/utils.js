/**
 * Some useful utils to build Mongoose schema
 *
 * Shoul only use for db Schemas
 */

// Generate a simple String Validator for schema usage
var generalStringValidator();
exports.generalStringValidator = generalStringValidator = function(pattern, errmsg) {
  return [
    function(s) {
      var r = s.match(pattern);

      if(!r || !r[0] || r[0].length != s.length) {
        return false;
      }

      return true;
    },
    errmsg
  ];
};

// auto discover Schemas and load them into Mongoose

