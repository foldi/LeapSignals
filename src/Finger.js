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

Finger.defaultColor = function() {
  exports.System.updateItemPropsByName('Finger', {
    color: [100, 100, 100]
  });
  Finger.color = [100, 100, 100];
};

Finger.activeColor = function() {
  exports.System.updateItemPropsByName('Finger', {
    color: [255, 100, 0]
  });
  Finger.color = [255, 100, 0];
};

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