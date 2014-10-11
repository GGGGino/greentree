/*! Greentree - v0.1.0 - 2014-10-11
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

    
    //oggetto.html("");
    this.setGradoAndGetMaxGrado();
    this.setFather();
    this.doTree2();
    this.contenitore.children(this.opzioni.selector+":gt(0)").remove();

    $('.riga').css({
      clear: 'both',
    });

    // Return something awesome.
    return true;
  };

  // Static method default options.
  $.greentree.options = {
    selector: 'div.ruoli'
  };

  // methods.
  $.greentree.prototype = {
    getItemsNumber: function(){
      return this.items.length;
    },
    getItems: function(){
      return this.contenitore.children(this.opzioni.selector);
    },
    setGradoAndGetMaxGrado: function(){
      var oggetti = this.items,
          numMax = oggetti[0].attributes.grado.value.split("-").length;

      for (var i = 0; i < oggetti.length; i++) {
        if( numMax <  oggetti[i].attributes.grado.value.split("-").length ){
          numMax = oggetti[i].attributes.grado.value.split("-").length;
        }
        var grado = oggetti[i].attributes.grado.value.split("-").length;
        this.items[i].setAttribute("riga",grado);
        this.items[i].grado = grado;
        this.items[i].attrGrado = oggetti[i].attributes.grado.value;
      }
      return numMax;
    },
    setFather: function(){
      for (var i = 0; i < this.items.length; i++) {
        var trovatobabbo = 0;
        for(var j = i; j < this.items.length; j++){
          if( i === 0){
            this.items[i].father = 0;
          }
          if( i !== j && this.items[j].attrGrado.toString().indexOf(this.items[i].attrGrado.toString()) === 0){
            trovatobabbo = 1;
            this.items[j].father = i;
          }
        }
      }
    },
    doTree: function(){
      for(var i = 1; i <= this.getMaxGrado(); i++){
        var html = "<div class=\"riga riga"+i+"\" riga=\""+i+"\">",
            numeroFigli = 0;
        for ( var j = 0; j < this.items.length; j++) {
          if(this.items[j].grado === i){
            numeroFigli++;
            var innerhtml = "<div class=\"contItem\">";
            innerhtml += this.items[j].outerHTML;
            innerhtml += "</div>";
            html += innerhtml;
          }
        }
        html += "</div>";
        this.contenitore.append(html);
        var widthCont = 100/numeroFigli;
        widthCont = widthCont + "%";
        $(".riga"+i+" .contItem").css({
          width: widthCont,
          float: 'left',
          textAlign: 'center',
        });
      }
    },
    doTree2: function(){
      for (var i = this.items.length - 1; i >= 0; i--) {
        for (var j = 1; j < this.items.length; j++) {
          if (this.items[j].father === i){
            this.items[i].innerHTML += this.items[j].outerHTML;
          }
        }
      }

    }
  };

  // Collection method.
  $.fn.greentree = function(options) {
    var questo = $(this);
    options = options || {};
    return new $.greentree(questo, options);
  };

}(jQuery));
