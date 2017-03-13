 (function() {
     /**
     * @function seekBar
     * @desc Calculates horizontal percent along seek bar where the event occurred
     * @param {Object} $document
     * @returns {Number} offsetXPercent
     */
     function seekBar($document) {
         var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
             var offsetXPercent = offsetX / seekBarWidth;
             offsetXPercent = Math.max(0, offsetXPercent);
             offsetXPercent = Math.min(1, offsetXPercent);
             return offsetXPercent;
         };
         
         return {
             templateUrl: '/templates/directives/seek_bar.html',
             replace: true,
             restrict: 'E',
             scope: { },
             link: function(scope, element, attributes) {
                 scope.value = 0;
                 scope.max = 100;
                 
                 /**
                 * @desc Holds the element that matches the
                 * <seek-bar> directive- allows us to call
                 * jQuery methods on it
                 * @type {Function}
                 */
                 var seekBar = $(element);
                 
                 /**
                 * @function percentString
                 * @desc Calculates percent based on value and * * max. value of seek bar
                 * @returns {String}
                 */
                 var percentString = function () {
                     var value = scope.value;
                     var max = scope.max;
                     var percent = value / max * 100;
                     return percent + "%";
                 };
                 
                 /**
                 * @function scope.fillStyle
                 * @desc Returns width of seek bar fill element
                 * based on the calculated percent
                 * @returns {Object}
                 */
                 scope.fillStyle = function() {
                     return {width: percentString()};
                 };
                 
                 /**
                 * @function scope.thumbStyle
                 * @desc Updates position of seek bar thumb
                 * @returns {Object}
                 */
                 scope.thumbStyle = function(event){
                     return {left: percentString()};
                 };
                 
                 /**
                 * @function scope.onClickSeekBar
                 * @desc Updates seek bar value based on the
                 * seek bar's width and where the user clicks on
                 * the seek bar
                 * @param {Object} event
                 */
                 scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                 };
                 
                /**
                 * @function scope.trackThumb
                 * @desc Applies change in value of scope.value as user drags seek bar thumb
                 */
                 scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                         scope.$apply(function() {
                            scope.value = percent * scope.max;
                          });
                    });
 
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                 };
                
              }  
          };
     }
 
     angular
         .module('blocJams')
         .directive('seekBar', seekBar);
 })();