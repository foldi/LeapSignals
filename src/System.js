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

  var i, max, j, max_j, palm, finger;

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

    for (i = 0, max = palms.length; i < max; i++) {
      for (j = 0, max_j = fingers.length; j < max_j; j++) {
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
    for (i = System._records.list.length - 1; i >=0 ; i--) {
      System._records.list[i].draw();
    }

  } else {
    // remove all items
    if (System._records.list.length) {
      for (i = System._records.list.length - 1; i >=0 ; i--) {
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