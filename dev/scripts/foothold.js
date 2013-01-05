/*
Foothold
Copyright (c) 2012 Your name
Your city, state zip, country
Your email
Your url

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/* Version: 1.3.0 */
/* Build time: January 5, 2013 12:55:10 */
/** @namespace */
var Foothold = {}, exports = Foothold;

(function(exports) {
'use strict';
/*global document, exports */
/**
 * Creates a new Cat.
 *
 * @constructor
 * @param {string} opt_msg A message.
 */
function Cat(opt_msg) {
  var msg = opt_msg || '';
  this.msg = msg;
}

Cat.prototype.name = 'Cat';

/**
 * Writes a message.
 *
 * @param {string} opt_txt Some text to append to the message.
 */
Cat.prototype.speak = function(opt_txt) {
  var txt = opt_txt || '', str, node;
  if (txt) {
    txt = ', ' + txt;
  }
  str = 'From ' + this.name + ': ' + this.msg + txt + '.';
  node = document.createTextNode(str);
  if (document.body) {
    document.body.appendChild(node);
    document.body.appendChild(document.createElement('p'));
  }
  return str;
};

exports.Cat = Cat;
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
}(exports));
