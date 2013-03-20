(function ($) {
    "use strict";
    $.fn.pin = function (options) {
        var scrollY = 0, elements = [], disabled = false;

        options = options || {};

        var recalculateLimits = function () {
            for (var i=0, len=elements.length; i<len; i++) {
                var $this = elements[i];

                if (options.minWidth && $(window).width() <= options.minWidth) {
                    if ($this.parent().is(".pin-wrapper")) { $this.unwrap(); }
                    $this.css({width: "", left: "", top: "", position: ""});
                    disabled = true;
                    continue;
                } else {
                    disabled = false;
                }

                var $full = options.containerSelector ? $this.closest(options.containerSelector) : $(document.body);
                var offset = $full.offset();
                var parentOffset = $this.offsetParent().offset();

                if (!$this.parent().is(".pin-wrapper")) {
                    $this.wrap("<div class='pin-wrapper'>");
                }

                $this.data("pin", {
                    from: offset.top,
                    to: offset.top + $full.height() - $this.outerHeight(),
                    end: offset.top + $full.height(),
                    parentTop: parentOffset.top
                });

                $this.css({width: $this.outerWidth()});
                $this.parent().css("height", $this.outerHeight());          
            }
        };

        var onScroll = function () {
            if (disabled) { return; }

            scrollY = window.scrollY;
   
            for (var i=0, len=elements.length; i<len; i++) {          
                var $this = $(elements[i]),
                    data  = $this.data("pin"),
                    from  = data.from,
                    to    = data.to;
              
                if (from + $this.outerHeight() > data.end) {
                    $this.css('position', '');
                    continue;
                }
              
                if (from < scrollY && to > scrollY) {
                    !($this.css("position") == "fixed") && $this.css({
                        left: $this.offset().left,
                        top: 0
                    }).css("position", "fixed");
                } else if (scrollY >= to) {
                    $this.css({
                        left: "auto",
                        top: to - data.parentTop
                    }).css("position", "absolute");
                } else {
                    $this.css("position", "");
                }
          }
        };

        var update = function () { recalculateLimits(); onScroll(); };

        this.each(function () {
            var $this = $(this), 
                data  = $(this).data('pin') || {};

            if (data && data.update) { return; }
            elements.push($this);
            $("img", this).one("load", recalculateLimits);
            data.update = update;
            $(this).data('pin', data);
        });

        $(window).scroll(onScroll);
        $(window).resize(function () { recalculateLimits(); });
        recalculateLimits();

        $(window).load(update);

        return this;
      };
})(jQuery);