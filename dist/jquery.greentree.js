/*! Greentree - v0.1.0 - 2014-09-25
* https://github.com/GGGGino/greentree
* Copyright (c) 2014 ggggino; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.greentree = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.greentree = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.greentree.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.greentree.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].greentree = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
