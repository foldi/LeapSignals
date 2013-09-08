/*! Foothold v1.0.0 - 2013-09-08 11:09:32 
 *  Vince Allen 
 *  Brooklyn, NY 
 *  vince@vinceallen.com 
 *  @vinceallenvince 
 *  License: MIT */

var Foothold = {}, exports = Foothold;

(function(exports) {

"use strict";

function Foot(opt_options) {
  var options = opt_options || {};
  this.message = options.message || 'You found a foothold.';
  this.name = 'Foot';
}

/**
 * Prints message to the body.
 */
Foot.prototype.slip = function() {
  document.body.innerText = this.message;
};


exports.Foot = Foot;

}(exports));