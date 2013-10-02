Palm.color = [0, 0, 0];

/**
 * Creates a new Palm.
 * @constructor
 */
function Palm(options) {
  Item.call(this, options);
  this.name = 'Palm';
}
exports.Utils.extend(Palm, Item);

Palm.defaultColor = function() {
  exports.System.updateItemPropsByName('Palm', {
    color: [0, 0, 0]
  });
  Palm.color = [0, 0, 0];
};

Palm.activeColor = function() {
  exports.System.updateItemPropsByName('Palm', {
    color: [200, 50, 0]
  });
  Palm.color = [200, 50, 0];
};

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
};

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