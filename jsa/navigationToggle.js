/**
 * スマホサイズでナビゲーションをトグルするボタンアクション
 */
var NavigationToggle = (function() {

    //constructor
    var NavigationToggle = function() {
        this.btnClick();
    };

    NavigationToggle.prototype = {
        // ナビゲーションボタンクリック時のイベント
        // リンクをクリック時にも同じイベントを設定する
        btnClick: function() {
            var _this = this;
            $('.btn_navigationToggle').on('click', function() {
                _this.toggleNavigation.call(this);
            });
            $('.m_navigationMenu li a').on('click', function() {
                if($(window).width() < 768) {
                    _this.toggleNavigation.call(this);
                }
            });
        },
        //メニューをトグルする
        toggleNavigation: function() {
            var parent = $(this).parents('.section');
            $('.btn_navigationToggle', parent).toggleClass('active');
            $('.m_navigationMenu', parent).slideToggle('fast');
        }
    };
    return NavigationToggle;
})();
