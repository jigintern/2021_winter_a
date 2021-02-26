"use strict"

import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

window.onload = async () => {
    const data = await fetchJSON("api/get-playlist/");
    alert(data)
    console.log(data);
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