"use strict"

import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

window.onload = async () => {
    const data = await fetchJSON("api/get-playlist/");
    console.log(data);

    $.ajax({
        type: 'get',
        url: 'https://www.googleapis.com/youtube/v3/playlistItems', // リクエストURL
        dataType: 'json',
        data: {
            // partは必須で指定が必要とのこと。レスポンスで返してもらいたいデータをカンマ区切りで指定する。snippetがあればとりあえず動画を再生するレスポンスが受け取れる。
            part: 'snippet',
             // 再生リストID
            playlistId: 'PLaHghXmoJ5Vb7CzgxyID4fn5DFmDmNV0m',
            // デフォルトは5件までしか受け取らないので、取得件数を変更
            // maxResults: 20, 
            // API Key
            key: 'AIzaSyC2mcQmPFUnEaGTIO9T6SQqn8zl1aqr_9Y'
        }
    }).done(function (response) {
        // 成功
        response.items.forEach(function (item) {
            console.log("成功！")
            var id = item.snippet.resourceId.videoId;
            console.log(id)
            $('#list').append('<iframe src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>');
        });
    }).fail(function () {
        // エラー
    });
};

let imgNumber = 0;
document.querySelectorAll('.scroll').forEach(elm => {
    elm.onscroll = function () {
        if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
            //スクロールが末尾に達した
            if (parseInt(this.dataset.lastnum) < parseInt(this.dataset.max)) {
                //未ロードの画像がある場合
                this.dataset.lastnum = parseInt(this.dataset.lastnum) + 1;
                let img = document.createElement('img');
                img.src = this.dataset.lastnum + '.jpg';
                this.appendChild(img);
                console.log(imgNumber += 1);
            }
        }
    };
});
