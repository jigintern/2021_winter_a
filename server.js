import { Server } from "http://js.sabae.cc/Server.js"

class MyServer extends Server {
    api(path, req) {
        // YouTubeの再生リストを追加する。
        if (path === "/api/add-playlist/") {
            let listjson = JSON.parse(Deno.readTextFileSync('./playlist.json'));
            // 重複を確認する。
            const listDuplicate = listjson.find(data => data.url === req.url);
            // 重複がなければ追加して「OK」、あれば「exist(存在する)」と返す。
            if (listDuplicate === undefined) {
                listjson.push({
                    "created_at": Date.now(),
                    "url": req.url
                })
                Deno.writeTextFile("playlist.json", JSON.stringify(listjson));
                return { res: "OK" };
            } else {
                return { res: "exist" };
            }
        }
    }
}

new MyServer(8001);