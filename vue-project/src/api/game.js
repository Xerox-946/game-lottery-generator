import request from "@/utils/request";

const service = "game"

export function gameHttp(url, api, params) {
  var _url = `${url}?Content={"Cmd":"${api}","Params":${params}}`;
  console.log(_url);
  return request({ url: _url, method: "get" });
}