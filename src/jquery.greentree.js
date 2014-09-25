/*
 * greentree
 * https://github.com/GGGGino/greentree
 *
 * Copyright (c) 2014 ggggino
 * Licensed under the MIT license.
 */

(function($) {


  // Static method.
  $.greentree = function(oggetto, options) {
    // Override default options with passed-in options.

    options = $.extend({}, $.greentree.options, options);

    this.opzioni = options;
    this.contenitore = oggetto;
    this.items = this.getItems();

    // Return something awesome.
    return true;
  };

  // Static method default options.
  $.greentree.options = {
    selector: 'div'
  };
  // methods.
  $.greentree.prototype = {
    getItemsNumber: function(){
      return this.contenitore.children(this.opzioni.selector).length;
    },
    getItems: function(){
      return this.contenitore.children(this.opzioni.selector);
    }
  };

  // Collection method.
  $.fn.greentree = function(options) {
    var questo = $(this);
    options = options || {};
    return new $.greentree(questo, options);
  };

}(jQuery));
