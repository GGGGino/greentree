/*! Greentree - v0.1.0 - 2014-10-10
* https://github.com/GGGGino/greentree
* Copyright (c) 2014 ggggino; Licensed MIT */
(function($) {


  // Static method.
  $.greentree = function(oggetto, options) {
    // Override default options with passed-in options.

    options = $.extend({}, $.greentree.options, options);

    this.opzioni = options;
    this.contenitore = oggetto;
    this.items = this.getItems();

    // empty the container for fill it
    var html,
        innerhtml,
        numeroFigli;
    oggetto.html("");
    for(var i = 1; i <= this.getMaxGrado(); i++){
      html = "<div class=\"riga riga"+i+"\" riga=\""+i+"\">";
      numeroFigli = 0;
      for ( var j = 0; j < this.items.length; j++) {
        if(this.items[j].grado === i){
          numeroFigli++;
          innerhtml = "<div class=\"contItem\">";
          innerhtml += this.items[j].outerHTML;
          innerhtml += "</div>";
          html += innerhtml;
        }
      }
      html += "</div>";
      oggetto.append(html);
      var widthCont = 100/numeroFigli;
      widthCont = widthCont + "%";
      $(".riga"+i+" .contItem").css({
        width: widthCont,
        float: 'left',
        textAlign: 'center',
      });
    }
    $('.riga').css({
      clear: 'both',
    });

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
      return this.items.length;
    },
    getItems: function(){
      return this.contenitore.children(this.opzioni.selector);
    },
    getMaxGrado: function(){
      var oggetti = this.items,
          numMax = oggetti[0].attributes.grado.value.split("-").length;

      for (var i = 0; i < oggetti.length; i++) {
        if( numMax <  oggetti[i].attributes.grado.value.split("-").length ){
          numMax = oggetti[i].attributes.grado.value.split("-").length;
        }
        var grado = oggetti[i].attributes.grado.value.split("-").length;
        this.items[i].setAttribute("riga",grado);
        this.items[i].grado = grado;
      }
      return numMax;
    }
  };

  // Collection method.
  $.fn.greentree = function(options) {
    var questo = $(this);
    options = options || {};
    return new $.greentree(questo, options);
  };

}(jQuery));
