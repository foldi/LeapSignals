/**
 * Creates a new Item.
 *
 * Set required properties in the constructor.
 * @constructor
 */
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