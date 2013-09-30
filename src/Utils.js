/**
 * @namespace
 */
var Utils = {};

/**
 * Use to extend the properties and methods of a superClass
 * onto a subClass.
 * @function extend
 * @memberof Utils
 */
Utils.extend = function(subClass, superClass) {
  function F() {}
  F.prototype = superClass.prototype;
  subClass.prototype = new F;
  subClass.prototype.constructor = subClass;
  subClass._superClass = superClass;
};

/**
 * Determines the size of the viewport window.
 *
 * @function extend
 * @memberof System
 * @returns {Object} The current viewport window width and height.
 */
Utils.getViewportSize = function() {

  var d = {
    'width' : false,
    'height' : false
  };

  if (typeof(window.innerWidth) !== 'undefined') {
    d.width = window.innerWidth;
    d.height = window.innerHeight;
  } else if (typeof(document.documentElement) !== 'undefined' &&
      typeof(document.documentElement.clientWidth) !== 'undefined') {
    d.width = document.documentElement.clientWidth;
    d.height = document.documentElement.clientHeight;
  } else if (typeof(document.body) !== 'undefined') {
    d.width = document.body.clientWidth;
    d.height = document.body.clientHeight;
  }
  return d;
};

/**
 * Re-maps a number from one range to another.
 *
 * @function map
 * @memberof System
 * @param {number} value The value to be converted.
 * @param {number} min1 Lower bound of the value's current range.
 * @param {number} max1 Upper bound of the value's current range.
 * @param {number} min2 Lower bound of the value's target range.
 * @param {number} max2 Upper bound of the value's target range.
 * @returns {number} A number.
 */
Utils.map = function(value, min1, max1, min2, max2) { // returns a new value relative to a new range
  var unitratio = (value - min1) / (max1 - min1);
  return (unitratio * (max2 - min2)) + min2;
};

/**
 * Converts radians to degrees.
 *
 * @function radiansToDegrees
 * @memberof Utils
 * @param {number} radians The radians value to be converted.
 * @returns {number} A number in degrees.
 */
Utils.radiansToDegrees = function(radians) {
  if (typeof radians !== 'undefined') {
    return radians * (180 / Math.PI);
  } else {
    if (typeof console !== 'undefined') {
      console.log('Error: Utils.radiansToDegrees is missing radians param.');
    }
    return false;
  }
};

/**
 * Constrain a value within a range.
 *
 * @function constrain
 * @memberof Utils
 * @param {number} val The value to constrain.
 * @param {number} low The lower bound of the range.
 * @param {number} high The upper bound of the range.
 * @returns {number} A number.
 */
Utils.constrain = function(val, low, high) {
  if (val > high) {
    return high;
  } else if (val < low) {
    return low;
  }
  return val;
};

/**
 * Concatenates a new cssText string.
 *
 * @function getCSSText
 * @memberof System
 * @param {Object} props A map of object properties.
 * @returns {string} A string representing cssText.
 */
Utils.getCSSText = function(props) {

  var trans = 'transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>); ' +
      '-webkit-transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>); ' +
      '-moz-transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>); ' +
      '-o-transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>); ' +
      '-ms-transform: translate3d(<x>px, <y>px, 0) rotate(<angle>deg) scale(<scale>, <scale>);';

  return trans.replace(/<x>/g, props.x).replace(/<y>/g, props.y).replace(/<angle>/g, props.angle).replace(/<scale>/g, props.scale) +
      'width: ' + props.width + 'px; height: ' + props.height + 'px; visibility: ' + props.visibility +
      '; background-color: rgb(' + props.color0 + ', ' + props.color1 + ', ' + props.color2 + '); border-radius: ' +
      props.borderRadius + '%; border: ' + props.borderWidth + 'px ' + props.borderStyle + ' rgb(0, 0, 0); z-index: ' + props.zIndex + ';';
};


