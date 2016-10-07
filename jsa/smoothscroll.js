/**
 * スムーススクロール
 * アンカーリンククリックでスムーズに遷移する
 */
var SmoothScroll = (function() {

    //constructor
    var SmoothScroll = function(margin, speed){
        this.scrollMargin = 0;
        this.linkClick();
    };

    SmoothScroll.prototype = {
        //#で始まるアンカーをクリックした場合に実行
        linkClick: function() {
            var _this = this;
            $('a[href^=#]').on('click', function(e) {
                var href= $(this).attr('href'),
                    target = $((href === '#') ? 'html' : href),
                    position;
                e.preventDefault();
                if($('.s_navigation_fixed').size()){
                    _this.scrollMargin = $('.navigationHeader').height();
                }
                position = target.offset().top - _this.scrollMargin;
                $('body,html').animate({scrollTop:position}, 1000, 'swing');
                return false;
            });
        }
    };
    return SmoothScroll;
})();
