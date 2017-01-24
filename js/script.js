;(function($, window, Amplitude) {
  'use strict';

  var pluginName = 'player';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.callData();
    },
    callData: function() {
      // var seft = this;
      $.ajax({
          url: 'data/data.json',
          type: 'GET',
          dataType: 'json'
        })
        .done(function(res) {
          Amplitude.init(res);
        })
        .fail(function() {
          console.log('error');
        });
      Amplitude.registerVisualization(BarVisualization, {
        width: '314',
        height: '314'
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };
  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });

}(jQuery, window, window.Amplitude));
