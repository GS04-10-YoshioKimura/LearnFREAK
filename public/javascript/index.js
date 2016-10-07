
var goods = {};
//1.ミルクココアインスタンスを作成
var milkcocoa = new MilkCocoa('flagimsrjhlt.mlkcca.com');
//2."message"データストアを作成
var ds = milkcocoa.dataStore("message");
var ds_clients = milkcocoa.dataStore("clients");
var socket = io("http://localhost:3000");

socket.on('vote',function(data){
  console.log(data);
});

function getGoodCount(id) {
    if (goods[id]) {
        return goods[id];
    } else {
        return 0;
    }
}

$('#good').click(function(){
  console.log("good");
  socket.emit('vote',{state:"good"});
});

$('#bad').click(function(){
  socket.emit('vote','bad');
});


function addGoodCount(id) {
    if (goods[id]) {
        goods[id]++;
    } else {
        goods[id] = 1;
    }
}
$(function () {
    var username = null;
    var icon = 0;
    var currentRoom;

    //アイコンクリック
    $(".icon").on("click", function () {
        $("#icon0").css('opacity', '0.6');
        $("#icon1").css('opacity', '0.6');
        $("#icon2").css('opacity', '0.6');
        icon = this.id;
        $(this).css('opacity', '1');
        console.log(icon);
    });
    //ログインクリック
    $('#complete-btn').on("click", function () {
        $(".login").fadeOut();
        username = $("#name").val();
        var hostname = username + "さんのチャットルーム"
        $("#title").html(hostname);
        //栗林追記
        currentRoom = $('#name').val();
        console.log(currentRoom);
        $('.app-link').after().text(currentRoom + 'に入室中！');
        loginComplete();
    });

    function loginComplete() {
        //3."message"データストアからメッセージを取ってくる
        ds.stream().sort("desc").next(function (err, datas) {
            datas.forEach(function (data) {
                // console.log(data.value.room);
                // console.log(currentRoom);
                // console.log(data.value.room == currentRoom);
                if (data.value.room != currentRoom) return;
                renderMessage(data);
            });
        });
    }

    // //3."message"データストアからメッセージを取ってくる
    // ds.stream().sort("desc").next(function(err, datas) {
    //     datas.forEach(function(data) {
    //         renderMessage(data);
    //     });
    // });
    //4."message"データストアのプッシュイベントを監視
    ds.on("push", function (e) {
        renderMessage(e);
        $('#board').animate({}, 'fast');
    });
    var last_message = "dummy";

    function renderMessage(message) {
        // goods[message.id] = message.value.good　 ? message.value.good : 0;
        // var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        // $('body').html($('body').html().replace(exp, "<a href='$1'>$1</a>"));
        //<p class="post-text">${escapeHTML(message.value.room)}</p>
        var html =
            `<div id="${message.id}" class="post">
          <p class="post-text autlink">${message.value.content}</p>
          <p class="post-date">${escapeHTML( new Date(message.value.date).toLocaleString())}</p>
          <input type="button" name="good" value="いいね${getGoodCount(message.id)}" onclick="iine(this)">
        </div>`;


        $("#" + last_message).after(html);
        last_message = message.id;
        $(".autlink").each(function () {
            $(this).html($(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a> '));
        });
    }

    function post() {

        //5."message"データストアにメッセージをプッシュする
        var room = escapeHTML($("#room").val());

        // var content = escapeHTML($("#content").val());
        var content = $("#content").val();
        content = content.split("\n").join("<br>");
        if (content && content !== "") {
            $('body').delay(100).animate({
                scrollTop: $(document).height()
            }, 100);
            ds.push({
                title: "タイトル",
                room: "room1",
                //room: currentRoom,
                content: content,
                good: 0,
                date: new Date().getTime()
            }, function (e) {});
        }
        $("#content").val("");
    }



    var $ta = $("#content");
    $('#content').keydown(function (e) {
        if (e.keyCode == 13) { // Enterが押された
            if (e.shiftKey) { // Shiftキーも押された
                $.noop();
            } else if ($ta.val().replace(/\s/g, "").length > 0) {
                post();
            } else {
                $.noop();
            }
        }
    });
});
//インジェクション対策
function escapeHTML(val) {
    return $('<div>').text(val).html();
};

function iine(inputElement) {
    addGoodCount(inputElement.parentElement.id);
    var id = inputElement.parentElement.id;
    inputElement.value = "いいね" + getGoodCount(inputElement.parentElement.id);
    ds.set(id, {
        good: getGoodCount(id)
    });
}
