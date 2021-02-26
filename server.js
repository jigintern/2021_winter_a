import { Server } from "http://js.sabae.cc/Server.js";

class MyServer extends Server {
  api(path) {
    const list = [];
    list.push("abc");
    return { name: "jigintern", path: path, list: list[0] };
  }
}

new MyServer(8001);
