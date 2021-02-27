import { Server } from "http://js.sabae.cc/Server.js";

class MyServer extends Server {

    api(path, req) {
        // URLのパラメーター取得する
        function getParam(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        // YouTubeの再生リストを追加する。
        if (path === "/api/add-playlist/") {
            let listjson = JSON.parse(Deno.readTextFileSync('./playlist.json'));
            // URLから再生リストのIDを取得する。
            let listid = getParam('list', req.url);
            // 重複を確認する。
            const listDuplicate = listjson.find(data => data.url === listid);
            // 重複がなければ追加して「OK」、あれば「exist(存在する)」と返す。
            if (listDuplicate === undefined) {
                listjson.push({
                    "created_at": Date.now(),
                    "url": listid
                })
                Deno.writeTextFile("playlist.json", JSON.stringify(listjson));
                return { res: "OK" };
            } else {
                return { res: "exist" };
            }
        }

        // 保存されているYouTubeの再生リストを取得する。
        if (path === "/api/get-playlist") {
            let listjson = JSON.parse(Deno.readTextFileSync('./playlist.json'));
            return listjson
        }
    }
}

new MyServer(8001);
