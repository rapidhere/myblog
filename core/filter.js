/**
 * Filter is a tool used to check data format
 *
 * For more info, please refer to docs
 */
var _ = require('underscore');

// A single Filter Control Unit
/**
 * field_name: {
 *  type: String, Number
 *  max:
 *  min:
 *  required:
 *  filter:
 * }
 */
var FilterUnit;
exports.FilterUnit = FilterUnit = function(key, filter_control) {
  if(! _.isObject(filter_control)) {
    throw new Error('Filter Unit require a Object as first argument!');
  }

  if(! _.has(filter_control, 'type')) {
    throw new Error('Type field is require in filter Control');
  }
  
  this.key = key;
  this.ctrl = filter_control;
};

FilterUnit.prototype.cleanUp = function(data) {
  // Get data
  var d = data[this.key];

  // Check required
  if(this.ctrl['required'] && d === undefined) {
    return {
      'ret': null,
      'err': this.key + ' , This field is required!',
    };
  } else if(d === undefined) {
    return {
      'ret': null,
      'err':'',
    }
  }

  // Check type
  var t = this.ctrl['type'];
  if(t === String) {
    if(! _.isString(d)) {
      return {
        'ret': null,
        'err': this.key + ', this field should be String!',
      };
    }
  } else if(t === Number) {
    // Try to convert it into a number
    if(_.isString(d)) {
      var r = parseFloat(d);

      if(_.isNaN(r)) {
        return {
          'ret': null,
          'err': this.key + ', cannot convert into a Number!',
        };
      }

      return {
        'ret': r,
        'err': '',
      };
    }
    
    // Otherwise you must be a number!
    if(! _.isNumber(d)) {
      return {
        'ret': null,
        'err': this.key + ', this field should be Number!',
      };
    }
  } else {
    throw new Error('Unknown type!');
  }

  // Check range
  if(this.ctrl.max !== undefined) {
    if(this.ctrl.type === String && d.length > this.ctrl.max) {
      return {
        'ret': null,
        'err': this.key + ', this field is too Long!',
      };
    }

    if(this.ctrl.type === Number && d > this.ctrl.max) {
      return {
        'ret': null,
        'err': this.key + ', this field is too big!',
      };
    }
  }

  if(this.ctrl.min !== undefined) {
    if(this.ctrl.type === String && d.length < this.ctrl.min) {
      return {
        'ret': null,
        'err': this.key + ', this field is to short!',
      };
    }

    if(this.ctrl.type === Number && d < this.ctrl.min) {
      return {
        'ret': null,
        'err': this.key + ', this field is to small!',
      };
    }
  }
  
  // Call custom filter
  if(this.ctrl.filter)
    return this.ctrl.filter(d);
  else {
    return {
      'ret': d,
      'err': '',
    }
  }
};

// The Filter object
var Filter;
exports.Filter = Filter = function(controls) {
  // controls can be a Object or undefined
  if(controls !== undefined && ! _.isObject(controls)) {
    throw new Error('Filter require a Object as first argument!');
  }
  
  // normalize
  if(controls === undefined) {
    controls = {};
  }
  
  filters = {};

  // Add FilterUnit
  _.each(controls, function(val, key) {
    var fu;

    if(val instanceof FilterUnit) {
      fu = val;
    } else {
      fu = new FilterUnit(key, val);
    }
    
    filters[key] = fu;
  });

  this.filters = filters;
};

Filter.prototype.clean = function(data) {
  // require a object
  if(! _.isObject(data)) {
    throw new Error('Require a Object as first argument!');
  }
  
  var errs = {};
  var rets = {};

  _.each(this.filters, function(fu, key) {
    var cret = fu.cleanUp(data);
    errs[key] = cret.err;
    rets[key] = cret.ret;
  });

  return [errs, rets];
};
