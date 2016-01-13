var ripple = angular.module('ripple', []);

ripple.directive('ripple', function () {
    return {
        restrict: 'E',
        scope: {
            'onClick': '='
        },
        templateUrl: '/eoj/templates/ripple/ripple.html',
        link: function (scope, elem, attrs) {
            $elem = $(elem).children();
            $elem.click(function (e) {
                $(this).html("");
                $ripple = $("<div class='inner-ripple'>");
                $(this).append($ripple);
                $ripple.css({
                    top: e.offsetY,
                    left: e.offsetX,
                    height: 0,
                    width: 0,
                }).css({
                    transition: '0.35s'
                }).css({
                    top: e.offsetY - $(this).outerWidth(),
                    left: e.offsetX - $(this).outerWidth(),
                    width: $(this).outerWidth() * 2,
                    height: $(this).outerWidth() * 2,
                });
                setTimeout(function () {
                    $ripple.css({
                        transition: '0s',
                    })
                }, 10);
                setTimeout(function () {
                    scope.onClick();
                }, 150);
                setTimeout(function() {
                    $(this).html("");
                    $ripple.remove();
                }.bind(this), 400)
            });
        }
    }
});