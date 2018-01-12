/**
 * @version 0.0.2
 */
(function ($) {
    var FloatLabels = {
        options: {},

        init: function() {
            var self = this;
            $(document).ready(function() {
                self.ready();
            });
        },

        ready: function() {
            var self = this;
            $(".float-labels .float-labels__element")
                .find("input, textarea")
                .focus(function() {
                    self.setActiveFields();
                    $(this)
                        .closest(".float-labels__element")
                        .addClass("hasValue");
                });

            $(".float-labels .float-labels__element label").click(function() {
                self.setActiveFields();
                $(this)
                    .closest(".float-labels__element")
                    .addClass("hasValue")
                    .find("input, textarea")
                    .focus();
            });

            $(".float-labels .float-labels__element")
                .find("input, textarea")
                .blur(function() {
                    self.setActiveFields();
                });

            return this;
        },

        setActiveFields: function() {
            var self = this;
            $(".float-labels")
                .find("input, textarea")
                .each(function() {
                    if ($(this).val() === "") {
                        $(this)
                            .closest(".float-labels__element")
                            .removeClass("hasValue");
                    } else {
                        $(this)
                            .closest(".float-labels__element")
                            .addClass("hasValue");
                    }
                });

            return this;
        }
    }.init();
})(jQuery);
