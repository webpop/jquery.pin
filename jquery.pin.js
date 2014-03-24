(function ($) {
    "use strict";
    $.fn.pin = function (options) {
        var scrollY = 0, elements = [], disabledPlugin = false, $window = $(window), $fixedHeaderOffset = 0;

        options = options || {};

        var recalculateLimits = function () {
            for (var i=0, len=elements.length; i<len; i++) {
                var $this = elements[i];

                if (options.minWidth && $window.width() <= options.minWidth) {
                    if ($this.parent().is(".pin-wrapper")) { $this.unwrap(); }
                    $this.css({width: "", left: "", top: "", position: ""});
                    disabled = true;
                    continue;
                } else {
                    disabledPlugin = false;
                }

                var $container = options.containerSelector ? $this.closest(options.containerSelector) : $(document.body);
                $fixedHeaderOffset = options.fixedHeaderSelector ? $(options.fixedHeaderSelector).outerHeight(true) : 0;
                var offset = $this.offset();
                var containerOffset = $container.offset();
                containerOffset.top -=  $fixedHeaderOffset;
                var parentOffset = $this.offsetParent().offset();


                if (!$this.parent().is(".pin-wrapper")) {
                    $this.wrap("<div class='pin-wrapper'>");
                }

                $this.data("pin", {
                    enabled:  $container.height() >= $this.height()+$fixedHeaderOffset,
                    from: options.containerSelector ? containerOffset.top : offset.top,
                    to: containerOffset.top + $container.height() - $this.outerHeight() - $fixedHeaderOffset,
                    end: containerOffset.top + $container.height() + $fixedHeaderOffset,
                    parentTop: parentOffset.top,
                    paddingTop: $fixedHeaderOffset,
                });
                $this.css({width: $this.outerWidth()});
                $this.parent().css("height", $this.outerHeight());
            }
        };

        var onScroll = function () {
            if (disabledPlugin) { return; }

            scrollY = $window.scrollTop();

            for (var i=0, len=elements.length; i<len; i++) {          
                var $this = $(elements[i]),
                data  = $this.data("pin"),
                enabled = data.enabled,
                from  = data.from,
                to    = data.to,
                end   = data.end,
                paddingTop = data.paddingTop;

                if(enabled)
                {
                    if (from + $this.outerHeight() + $fixedHeaderOffset > end) {
                        $this.css({position: "", top: "", left: "", overflowY: "", height: ""}).removeClass('pin-fixed pin-absolute pin-top');
                        continue;
                    }

                    if (from < scrollY && to > scrollY) {
                        !($this.css("position") == "fixed") && $this.css({
                            left: $this.offset().left,
                            top: 0
                        }).css({"position": "fixed", overflowY: "auto", height: "100%", paddingTop: paddingTop}).addClass('pin-fixed').removeClass('pin-absolute pin-top');
                    } else if (scrollY >= to) {
                        $this.css({
                            left: "auto",
                            top: to - data.parentTop
                        }).css({position: "absolute", height: "", overflowY: "", paddingTop: paddingTop}).addClass('pin-absolute').removeClass('pin-fixed pin-top');
                    } else {
                        $this.css({position: "", top: "", left: "", overflowY: "", height: "", paddingTop: 0}).removeClass('pin-fixed pin-absolute').addClass('pin-top');
                    }
                }
                else
                {
                    $this.css('paddingTop', 0);
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

        $window.scroll(onScroll);
        $window.resize(function () { recalculateLimits(); });
        recalculateLimits();

        $window.load(update);

        return this;
    };
})(jQuery);
