/**
 * Some useful utils to build Mongoose schema
 *
 * Shoul only use for db Schemas
 */

var fs = require('fs');
var path = require('path');

// Generate a simple String Validator for schema usage
// Depcrated!
var generalStringValidator;
exports.generalStringValidator = generalStringValidator =
function(pattern, errmsg) {
  return [
    function(s) {
      var r = s.match(pattern);

      if(!r || !r[0] || r[0].length !== s.length) {
        return false;
      }

      return true;
    },
    errmsg
  ];
};

// auto discover Schemas and load them into Mongoose
var autoDiscoverSchemas;
exports.autoDiscoverSchemas = autoDiscoverSchemas = function() {
  var schema_dir = path.join(__dirname, './schemas/');

  fs.readdirSync(schema_dir).forEach(function(schname) {
    // Load the schema file
    require(path.join(schema_dir, schname));
  });
};
