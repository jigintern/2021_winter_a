import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

window.onload = async () => {
    const data = await fetchJSON("./playlist.json");
    console.log(data);
    for (const item of data) {
        const listdiv = document.createElement("div");
        listdiv.className = "list"; // .list
        main.appendChild(listdiv);
        const iframes = item.videoids.map(id => {
            return '<iframe src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>';
        });
        listdiv.innerHTML = iframes.join("");
    }
};

send.onclick = async () => {
    const id = (() => {
        const val = urlTextBox.value;
        const n = val.indexOf("list=");
        if (n < 0) {
            return val;
        }
        return val.substring(n + 5);
    })();
    try {
        await fetchJSON("/api/add-playlist/", id);
        alert("登録完了!");
    } catch (e) {
        alert("登録失敗!" + e);
    }
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
