/*global document, exports */
/**
 * Creates a new Dog.
 *
 * @constructor
 * @param {string} opt_msg A message.
 */
function Dog(opt_msg) {
  var msg = opt_msg || '';
  this.msg = msg;
}

Dog.prototype.name = 'Dog';

/**
 * Writes a message.
 *
 * @param {string} opt_txt Some text to append to the message.
 */
Dog.prototype.speak = function(opt_txt) {
  var txt = opt_txt || '', str, node;
  if (txt) {
    txt = ', ' + txt;
  }
  str = 'From ' + this.name + ': ' + this.msg +  txt + '.';
  node = document.createTextNode(str);
  if (document.body) {
    document.body.appendChild(node);
    document.body.appendChild(document.createElement('p'));
  }
  return str;
};

exports.Dog = Dog;