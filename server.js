import { Server } from "http://js.sabae.cc/Server.js"

class MyServer extends Server {
    api(path, req) {
        // YouTubeの再生リストを追加する。
        console.log(path);
        if (path === "/api/addplaylist/") {
            let listjson = JSON.parse(Deno.readTextFileSync('./playlist.json'));
            // 重複を確認する
            const listDuplicate = listjson.find(data => data.url === req.url);
            // なければ追加、あれば「存在する」と返す
            if (listDuplicate === undefined) {
                listjson.push({
                    "created_at": Date.now(),
                    "url": req.url
                })
                Deno.writeTextFile("playlist.json", JSON.stringify(listjson));
                return { res: "OK" };
            } else {
                return { res: "existed" };
            }
        }
    }
}

new MyServer(8001);