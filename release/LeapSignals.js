/*! LeapSignals v1.0.0 - 2013-09-30 06:09:09 
 *  Vince Allen 
 *  Brooklyn, NY 
 *  vince@vinceallen.com 
 *  @vinceallenvince 
 *  License: MIT */

var LeapSignals = {}, exports = LeapSignals;

(function(exports) {

"use strict";

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



exports.Utils = Utils;

/**
 * Creates a new Vector.
 *
 * @param {number} [opt_x = 0] The x location.
 * @param {number} [opt_y = 0] The y location.
 * @constructor
 */
function Vector(opt_x, opt_y) {
  var x = opt_x || 0,
      y = opt_y || 0;
  this.x = x;
  this.y = y;
}

/**
 * Subtract two vectors.
 *
 * @param {number} v1 The first vector.
 * @param {number} v2 The second vector.
 * @returns {Object} A new Vector.
 */
Vector.VectorSub = function(v1, v2) {
  return new Vector(v1.x - v2.x, v1.y - v2.y);
};

/**
 * Add two vectors.
 *
 * @param {number} v1 The first vector.
 * @param {number} v2 The second vector.
 * @returns {Object} A new Vector.
 */
Vector.VectorAdd = function(v1, v2) {
  return new Vector(v1.x + v2.x, v1.y + v2.y);
};

/**
 * Multiply a vector by a scalar value.
 *
 * @param {number} v A vector.
 * @param {number} n Vector will be multiplied by this number.
 * @returns {Object} A new Vector.
 */
Vector.VectorMult = function(v, n) {
  return new Vector(v.x * n, v.y * n);
};

/**
 * Divide two vectors.
 *
 * @param {number} v A vector.
 * @param {number} n Vector will be divided by this number.
 * @returns {Object} A new Vector.
 */
Vector.VectorDiv = function(v, n) {
  return new Vector(v.x / n, v.y / n);
};

/**
 * Calculates the distance between two vectors.
 *
 * @param {number} v1 The first vector.
 * @param {number} v2 The second vector.
 * @returns {number} The distance between the two vectors.
 */
Vector.VectorDistance = function(v1, v2) {
  return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
};

/**
 * Get the midpoint between two vectors.
 *
 * @param {number} v1 The first vector.
 * @param {number} v2 The second vector.
 * @returns {Object} A new Vector.
 */
Vector.VectorMidPoint = function(v1, v2) {
  return Vector.VectorAdd(v1, v2).div(2); // midpoint = (v1 + v2)/2
};

/**
 * Get the angle between two vectors.
 *
 * @param {number} v1 The first vector.
 * @param {number} v2 The second vector.
 * @returns {number} An angle.
 */
Vector.VectorAngleBetween = function(v1, v2) {
  var dot = v1.dot(v2),
  theta = Math.acos(dot / (v1.mag() * v2.mag()));
  return theta;
};

Vector.prototype.name = 'Vector';

/**
* Returns an new vector with all properties and methods of the
* old vector copied to the new vector's prototype.
*
* @returns {Object} A vector.
*/
Vector.prototype.clone = function() {
  function F() {}
  F.prototype = this;
  return new F;
};

/**
 * Adds a vector to this vector.
 *
 * @param {Object} vector The vector to add.
 * @returns {Object} This vector.
 */
Vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
  return this;
};

/**
 * Subtracts a vector from this vector.
 *
 * @param {Object} vector The vector to subtract.
 * @returns {Object} This vector.
 */
Vector.prototype.sub = function(vector) {
  this.x -= vector.x;
  this.y -= vector.y;
  return this;
};

/**
 * Multiplies this vector by a passed value.
 *
 * @param {number} n Vector will be multiplied by this number.
 * @returns {Object} This vector.
 */
Vector.prototype.mult = function(n) {
  this.x *= n;
  this.y *= n;
  return this;
};

/**
 * Divides this vector by a passed value.
 *
 * @param {number} n Vector will be divided by this number.
 * @returns {Object} This vector.
 */
Vector.prototype.div = function(n) {
  this.x = this.x / n;
  this.y = this.y / n;
  return this;
};

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {number} The vector's magnitude.
 */
Vector.prototype.mag = function() {
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

/**
 * Limits the vector's magnitude.
 *
 * @param {number} opt_high The upper bound of the vector's magnitude
 * @param {number} opt_low The lower bound of the vector's magnitude.
 * @returns {Object} This vector.
 */
Vector.prototype.limit = function(opt_high, opt_low) {
  var high = opt_high || null,
      low = opt_low || null;
  if (high && this.mag() > high) {
    this.normalize();
    this.mult(high);
  }
  if (low && this.mag() < low) {
    this.normalize();
    this.mult(low);
  }
  return this;
};

/**
 * Divides a vector by its magnitude to reduce its magnitude to 1.
 * Typically used to retrieve the direction of the vector for later manipulation.
 *
 * @returns {Object} This vector.
 */
Vector.prototype.normalize = function() {
  var m = this.mag();
  if (m !== 0) {
    return this.div(m);
  }
};

/**
 * Calculates the distance between this vector and a passed vector.
 *
 * @param {Object} vector The target vector.
 * @returns {Object} The distance between the two vectors.
 */
Vector.prototype.distance = function(vector) {
  return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2));
};

/**
 * Rotates a vector using a passed angle in radians.
 *
 * @param {number} radians The angle to rotate in radians.
 * @returns {Object} This vector.
 */
Vector.prototype.rotate = function(radians) {
  var cos = Math.cos(radians),
    sin = Math.sin(radians),
    x = this.x,
    y = this.y;

  this.x = x * cos - y * sin;
  this.y = x * sin + y * cos;
  return this;
};

/**
 * Calculates the midpoint between this vector and a passed vector.
 *
 * @param {Object} v1 The first vector.
 * @param {Object} v1 The second vector.
 * @returns {Object} A vector representing the midpoint between the passed vectors.
 */
Vector.prototype.midpoint = function(vector) {
  return Vector.VectorAdd(this, vector).div(2);
};

/**
 * Calulates the dot product.
 *
 * @param {Object} vector The target vector.
 * @returns {Object} A vector.
 */
Vector.prototype.dot = function(vector) {
  if (this.z && vector.z) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }
  return this.x * vector.x + this.y * vector.y;
};

exports.Vector = Vector;

System._records = {
  list: []
};

System.idCount = 0;

System.ready = false;

System.pool = [];

/**
 * Creates a new System.
 * @requires Leap
 */
function System() {
  if (!Leap) {
    throw new Error('A new System requires Leap.');
  }
  this.controller = null;
  this.viewportSize = null;
  this.iBoxWidth = null;
  this.iBoxHeight = null;
  this.iBoxDepth = null;
  this.interactionBox = null;
}

/**
 * Initializes the system.
 * @param {Object} opt_iBox Optional properties for the interaction box.
 */
System.init = function(opt_iBox) {
  this.viewportSize = exports.Utils.getViewportSize();
  this.iBoxWidth = 600 || iBox.iBoxWidth;
  this.iBoxHeight = 300 || iBox.iBoxHeight;
  this.iBoxDepth = 300 || iBox.iBoxDepth;
  this.interactionBox = new Leap.InteractionBox({
    center: [0, this.iBoxHeight / 2, 0],
    size: [this.iBoxWidth, this.iBoxHeight, this.iBoxDepth]
  });
  
  this.controller = new Leap.Controller({enableGestures: true});
  this.controller.on('connect', function() {
    console.log("LEAP: The client is connected to the websocket server.");
  });
  this.controller.on('ready', function() {
    console.log("LEAP: The protocol has been selected.");
  });
  this.controller.on('deviceConnected', function() {
    console.log("LEAP: A Leap device has been connected.");
  }); 
  this.controller.on('deviceDisconnected', function() {
    console.log("LEAP: A Leap device has been disconnected.");
  });       
  this.controller.on('frame', this._handleFrame.bind(this));
  this.controller.connect();
};

System.getId = function() {
  return ++System.idCount;
};

/**
 * Adds an item to the system.
 *
 * @function add
 * @memberof System
 * @param {string} klass Function will try to create an instance of this class.
 * @param {Object=} opt_options Object properties.
 */
System.add = function(klass, opt_options) {

  var options = opt_options || {},
      records = System._records.list,
      i, max, item, pool;

  pool = this.getAllItemsByName(klass, System.pool);

  if (pool.length) {
    for (i = 0, max = System.pool.length; i < max; i++) {
      if (System.pool[i].name === klass) {
        item = System.pool.splice(i, 1)[0];
        break;
      }
    }    
  } else {
    item = new exports[klass](options);
  }

  item.reset(options);
  item.init(options);
  System._records.list.push(item);

  return item;
};

/**
 * Handles Leap controller's animationFrame event.
 * @private
 */
System._handleFrame = function(frame) {  

  var i, max, palm, finger;

  if (frame.hands.length) {
      
    for (i = 0, max = frame.hands.length; i < max; i++) { // loop thru hands in frame
      palm = System.getAllItemsByAttribute('handId', frame.hands[i].id)[0]; // check if we have a hand w hand[i].id
      if (!palm) { // if no, create one
        /*palm = new exports.Palm({
          frameId: frame.id,
          handId: frame.hands[i].id,
        });
        palm.init();
        System._records.list.push(palm);*/
        System.add('Palm', {
          frameId: frame.id,
          handId: frame.hands[i].id
        });
      } else { // if yes, update props 
        palm.step(frame.id, frame.hands[i]);
      }
    }
    
    for (i = 0, max = frame.fingers.length; i < max; i++) { // loop thru fingers in frame
      // check if we have a finger w finger[i].id
      finger = System.getAllItemsByAttribute('fingerId', frame.fingers[i].id)[0];
      if (!finger) { // if no, create one
        /*finger = new exports.Finger({
          frameId: frame.id,
          handId: frame.fingers[i].handId,
          fingerId: frame.fingers[i].id
        });
        finger.init();
        System._records.list.push(finger);*/
        System.add('Finger', {
          frameId: frame.id,
          handId: frame.fingers[i].handId,
          fingerId: frame.fingers[i].id
        });        
      } else { // if yes, update props 
        finger.step(frame.id, frame.fingers[i]);
      }      
    }
    
    // to create connectors, loop thru all palms and fingers
    var palms = System.getAllItemsByName('Palm'),
        fingers = System.getAllItemsByName('Finger');

    for (var i = 0, max = palms.length; i < max; i++) {
      for (var j = 0, max_j = fingers.length; j < max_j; j++) {
        if (fingers[j].handId === palms[i].handId) {
          
          var connector = System.getAllItemsByAttribute('connectorId', fingers[j].fingerId)[0];
          if (!connector) { // if no, create one
            /*connector = new exports.Connector({
              frameId: frame.id,
              fingerId: fingers[j].fingerId,
            });
            connector.init({
              frameId: frame.id,
              connectorId: fingers[j].fingerId,
              parentA: fingers[j],
              parentB: palms[i]
            });
            System._records.list.push(connector);*/
            System.add('Connector', {
              frameId: frame.id,
              fingerId: fingers[j].fingerId,
              connectorId: fingers[j].fingerId,
              parentA: fingers[j],
              parentB: palms[i]              
            });             
          } else { // if yes, update props 
            connector.step(frame.id);
          }
        }
      }
    }
    // loop thru all fingers
    

    // get all items wout an updated frame id
    var toRemove = System.getAllItemsWithoutAttribute('frameId', frame.id);
    
    for (i = 0, max = toRemove.length; i < max; i++) {
      System.destroyItem(toRemove[i]);
    }
  
    // draw
    for (var i= System._records.list.length - 1; i >=0 ; i--) {
      System._records.list[i].draw();
    }
    
  } else {
    // remove all items
    if (System._records.list.length) {
      for (var i= System._records.list.length - 1; i >=0 ; i--) {
        System.destroyItem(System._records.list[i]);
      }
    }
    System.ready = false;
    Palm.color = [0, 0, 0];
    Finger.color = [100, 100, 100];
  }
  

  if (frame.hands[0] && frame.hands[0].palmNormal[1] > 0 && !System.ready) {
    System.ready = true;
    System.updateItemPropsByName('Palm', {
      color: [200, 50, 0]
    });
    Palm.color = [200, 50, 0];    
    System.updateItemPropsByName('Finger', {
      color: [255, 100, 0]
    });
    Finger.color = [255, 100, 0];
  }
  
  // gestures
  if (frame.gestures.length && System.ready) {
    var gesture = frame.gestures[0];
    if (gesture.type === 'swipe' && gesture.state === 'update') {
      if (gesture.direction[0] > 0) {
        console.log('right');
      } else {
        console.log('left');
      }
    }
  }
  
};

/**
 * Removes an item from a world.
 *
 * @function destroyItem
 * @memberof System
 * @param {Object} obj The item to remove.
 */
System.destroyItem = function (obj) {

  var i, max, records = this._records.list;

  for (i = 0, max = records.length; i < max; i++) {
    if (records[i].id === obj.id) {
      //records[i].el.parentNode.removeChild(records[i].el); // remove record el
      //records.splice(i, 1); // remove record
      records[i].el.style.visibility = 'hidden'; // hide item
      records[i].el.style.display = 'none';
      records[i].el.style.opacity = 0;
      System.pool[System.pool.length] = records.splice(i, 1)[0]; // move record to pool array
      break;
    }
  }
};

/**
 * Returns an array of items created from the same constructor.
 *
 * @function getAllItemsByName
 * @memberof System
 * @param {string} name The 'name' property.
 * @param {Array} [opt_list = this._records] An optional list of items.
 * @returns {Array} An array of items.
 */
System.getAllItemsByName = function(name, opt_list) {

  var i, max, arr = [],
      list = opt_list || this._records.list;

  for (i = 0, max = list.length; i < max; i++) {
    if (list[i].name === name) {
      arr[arr.length] = list[i];
    }
  }
  return arr;
};

/**
 * Returns an array of items with an attribute that matches the
 * passed 'attr'. If 'opt_val' is passed, 'attr' must equal 'val'.
 *
 * @function getAllItemsByAttribute
 * @memberof System
 * @param {string} attr The property to match.
 * @param {*} [opt_val=] The 'attr' property must equal 'val'.
 * @returns {Array} An array of items.
 */
System.getAllItemsByAttribute = function(attr, opt_val) {

  var i, max, arr = [], records = this._records.list,
      val = typeof opt_val !== 'undefined' ? opt_val : null;

  for (i = 0, max = records.length; i < max; i++) {
    if (typeof records[i][attr] !== 'undefined') {
      if (val !== null && records[i][attr] !== val) {
        continue;
      }
      arr[arr.length] = records[i];
    }
  }
  return arr;
};

/**
 * Returns an array of items without an attribute that matches the
 * passed 'attr'. If 'opt_val' is passed, 'attr' must not equal 'val'.
 *
 * @function getAllItemsWithoutAttribute
 * @memberof System
 * @param {string} attr The property to match.
 * @param {*} [opt_val=] The 'attr' property must not equal 'val'.
 * @returns {Array} An array of items.
 */
System.getAllItemsWithoutAttribute = function(attr, opt_val) {

  var i, max, arr = [], records = this._records.list,
      val = typeof opt_val !== 'undefined' ? opt_val : null;

  for (i = 0, max = records.length; i < max; i++) {
    if (typeof records[i][attr] === 'undefined' || records[i][attr] !== val) {
      arr[arr.length] = records[i];
    }
  }
  return arr;
};

/**
 * Updates the properties of items created from the same constructor.
 *
 * @function updateItemPropsByName
 * @memberof System
 * @param {string} name The constructor name.
 * @param {Object} props A map of properties to update.
 * @returns {Array} An array of items.
 * @example
 * System.updateItemPropsByName('point', {
 *    color: [0, 0, 0],
 *    scale: 2
 * }); // all points will turn black and double in size
 */
System.updateItemPropsByName = function(name, props) {

  var i, max, p, arr = this.getAllItemsByName(name);

  for (i = 0, max = arr.length; i < max; i++) {
    for (p in props) {
      if (props.hasOwnProperty(p)) {
        arr[i][p] = props[p];
      }
    }
  }
  return arr;
};
exports.System = System;

/**
 * Creates a new Connector.
 *
 * @constructor
 * @extends Burner.Item
 * @param {Object} [opt_options=] A map of initial properties.
 */
function Connector(opt_options) {
  var options = opt_options || {};
  Item.call(this, options);
  this.name = 'Connector';
}
Utils.extend(Connector, Item);

/**
 * Initializes an instance.
 *
 * @param {Object} options A map of initial properties.
 * @param {Object} parentA The object that starts the connection.
 * @param {Object} parentB The object that ends the connection.
 * @param {number} [options.opacity = 1] Opacity.
 * @param {number} [options.zIndex = 0] zIndex.
 * @param {number} [options.borderWidth = 1] Border width.
 * @param {string} [options.borderStyle = 'dotted'] Border style.
 * @param {Array} [options.borderColor = 150, 150, 150] Border color.
 */
Connector.prototype.init = function(options) {

  if (!options || !options.parentA || !options.parentB) {
    throw new Error('Connector: both parentA and parentB are required.');
  }
  this.parentA = options.parentA;
  this.parentB = options.parentB;
  this.frameId = options.frameId;
  this.connectorId = options.connectorId;

  this.width = 0;
  this.height = 0;
  this.borderWidth = 1;
  this.borderRadius = 0;
  this.borderStyle = 'dotted';
  this.borderColor = typeof options.borderColor === 'undefined' ? [150, 150, 150] : options.borderColor;
  this.color = 'transparent';
  this.zIndex = options.zIndex || 5; 
  this.visibility = 'hidden';
  this.el.classList.add(this.name.toLowerCase());  
  //document.body.appendChild(this.el);
};

/**
 * Called every frame, step() updates the instance's properties.
 */
Connector.prototype.step = function(frameId) {

  var a = this.parentA.location,
      b = this.parentB.location;

  this.frameId = frameId;
  this.visibility = 'visible';

  this.width = Math.floor(exports.Vector.VectorSub(this.parentA.location,
      this.parentB.location).mag());

  this.location = exports.Vector.VectorAdd(this.parentA.location,
      this.parentB.location).div(2); // midpoint = (v1 + v2)/2

  this.angle = Utils.radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x) );
};

exports.Connector = Connector;

function Item(options) {
  this.id = System.getId();
  this.el = document.createElement('div');
  this.el.className = 'item';
  this.el.id = this.id;
  document.body.appendChild(this.el);
}

Item.prototype.init = function() {
  throw new Error('init() not implemented in ' + this.name + ' class.');
};

/**
 * Resets all properties.
 *
 */
Item.prototype.reset = function(opt_options) {

  var i, options = opt_options || {};

  for (i in options) {
    if (options.hasOwnProperty(i)) {
      this[i] = options[i];
    }
  }

  this.frameId = options.frameId;
  this.handId = options.handId;
  this.fingerId = options.fingerId;
  this.connectorId = options.connectorId;

  this.width = typeof options.width === 'undefined' ? 100 : options.width;
  this.height = typeof options.height === 'undefined' ? 100 : options.height;
  this.location = options.location || new exports.Vector();
  this.scale = typeof options.scale === 'undefined' ? 1 : options.scale;
  this.angle = options.angle || 0;
  this.color = options.color || Finger.color;
  this.borderRadius = typeof options.borderRadius === 'undefined' ? 100 : options.borderRadius;
  this.borderWidth = options.borderWidth || 0;
  this.borderStyle = options.borderStyle || 'none';
  this.zIndex = typeof options.zIndex === 'undefined' ? 1 : options.zIndex;  
  this.visibility = options.visibility || 'visible';
};

/**
 * Renders the item's dom element.
 */
Item.prototype.draw = function() {

  var obj = this;

  var cssText = exports.Utils.getCSSText({
    x: obj.location.x - (obj.width / 2) || -5000,
    y: obj.location.y - (obj.height / 2) || -5000,
    angle: obj.angle || 0,
    scale: obj.scale || 1,
    width: obj.width || 0,
    height: obj.height || 0,
    color0: obj.color[0],
    color1: obj.color[1],
    color2: obj.color[2],
    visibility: obj.visibility,
    opacity: obj.opacity,
    zIndex: obj.zIndex,
    borderWidth: obj.borderWidth,
    borderStyle: obj.borderStyle,
    borderRadius: obj.borderRadius
  });

  this.el.style.cssText = cssText;

};
exports.Item = Item;

Palm.color = [0, 0, 0];

/**
 * Creates a new Palm.
 * @constructor
 */
function Palm(options) {
  Item.call(this, options);  
  this.name = 'Palm';
}
Utils.extend(Palm, Item);

/**
 * Sets required properties and updates DOM element.
 */
Palm.prototype.init = function() {
  this.width = 100;
  this.height = 100;
  this.color = Palm.color;
  this.zIndex = 10;
  this.visibility = 'hidden';
  this.el.classList.add(this.name.toLowerCase());
}

/**
 * Updates palm properties.
 * @param {Object} hand An instance of the Leap Hand class.
 */
Palm.prototype.step = function(frameId, hand) {
  this.frameId = frameId;
  this.visibility = 'visible';
  var palmPosition = hand.stabilizedPalmPosition;
  var norm = System.interactionBox.normalizePoint(palmPosition, false);
  if (hand.valid &&
      norm[0] < 1 && // x
      norm[0] > 0 &&
      norm[1] < 1 && // y
      norm[1] > 0 &&
      norm[2] < 1 && // z
      norm[2] > 0) {
    // hand is inside interaction box
    
    this.location.x = exports.Utils.map(norm[0], 0, 1, 0, System.viewportSize.width);
    this.location.y = exports.Utils.map(norm[1], 0, 1, System.viewportSize.height, 0);
    this.scale = norm[2];
    this.angle = -exports.Utils.radiansToDegrees(hand.roll());
  }
  this.palmNormal = hand.palmNormal;
};
exports.Palm = Palm;

Finger.color = [100, 100, 100];

/**
 * Creates a new Finger.
 * @constructor
 */
function Finger(options) {
  Item.call(this, options);
  this.name = 'Finger';
  this.connector = options.connector;
}
Utils.extend(Finger, Item);

Finger.prototype.init = function() {
  this.width = 50;
  this.height = 50;
  this.color = Finger.color;
  this.zIndex = 1;
  this.visibility = 'hidden';
  this.el.classList.add(this.name.toLowerCase());  
};

/**
 * Updates palm properties.
 * @param {Object} hand An instance of the Leap Finger class.
 */
Finger.prototype.step = function(frameId, finger) {
  this.frameId = frameId;
  this.visibility = 'visible';
  var position = finger.stabilizedTipPosition;
  var norm = System.interactionBox.normalizePoint(position, false);
  if (finger.valid &&
      norm[0] < 1 && // x
      norm[0] > 0 &&
      norm[1] < 1 && // y
      norm[1] > 0 &&
      norm[2] < 1 && // z
      norm[2] > 0) {
    // finger is inside interaction box
    
    this.location.x = exports.Utils.map(norm[0], 0, 1, 0, System.viewportSize.width);
    this.location.y = exports.Utils.map(norm[1], 0, 1, System.viewportSize.height, 0);
    this.scale = norm[2];
    this.angle = 0;
  }
};
exports.Finger = Finger;

}(exports));