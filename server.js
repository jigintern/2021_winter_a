import { Server } from "http://js.sabae.cc/Server.js";

const API_KEY = Deno.readTextFileSync("apikey.txt").trim();

const getYoutubePlaylist = async (listid) => {
    // https://developers.google.com/youtube/v3/docs/playlistItems?hl=ja
    const baseurl = "https://www.googleapis.com/youtube/v3/playlistItems";
    const maxResults = 50; // max 50 (default 5)
    const url = `${baseurl}?part=snippet&playlistId=${listid}&maxResults=${maxResults}&key=${API_KEY}`;
    const response = await (await fetch(url)).json();
    const videoids = response.items.map(item => item.snippet.resourceId.videoId);
    return videoids;
};

class MyServer extends Server {
    async api(path, req) {
        // YouTubeの再生リストを追加する
        if (path === "/api/add-playlist/") {
            const listjson = JSON.parse(Deno.readTextFileSync('./static/playlist.json'));
            // URLから再生リストのIDを取得する。
            const listid = req; //getParam('list', req.url);
            // 重複を確認する。
            const listDuplicate = listjson.find(data => data.url === listid);
            // 重複がなければ追加して「OK」、あれば「exist(存在する)」と返す。
            if (listDuplicate === undefined) {
                const videoids = await getYoutubePlaylist(listid);
                listjson.push({
                    "created_at": Date.now(),
                    "url": listid,
                    videoids
                });
                Deno.writeTextFile("playlist.json", JSON.stringify(listjson));
                return { res: "OK" };
            } else {
                return { res: "exist" };
            }
        }
    }
}

new MyServer(8001);
