import { Component } from '@angular/core';

var admin = true;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  video = { "etag": "\"uQc-MPTsstrHkQcRXL3IWLmeNsM/LDJWHgmt1jJWmxubeKiABxTPC9g\"", "id": { "kind": "youtube#video", "videoId": "CTGmtPekBMw" }, "kind": "youtube#searchResult", "snippet": { "channelId": "UCVzMjM4S_VyeUm2XqVvhGpQ", "channelTitle": "MAMI TAIBANG", "description": "Dedicated To BEBE Panthoibi Film Industry Ojitkumar Luwangcha Present NUNGSHIBI Cast: Naopa,Medha,Nganjathoi Singer: Retishbond ...", "liveBroadcastContent": "none", "publishedAt": "2017-03-15T14:55:39.000Z", "thumbnails": { "default": { "height": 90, "url": "https://i.ytimg.com/vi/CTGmtPekBMw/default.jpg", "width": 120 }, "high": { "height": 360, "url": "https://i.ytimg.com/vi/CTGmtPekBMw/hqdefault.jpg", "width": 480 }, "medium": { "height": 180, "url": "https://i.ytimg.com/vi/CTGmtPekBMw/mqdefault.jpg", "width": 320 } }, "title": "Nungshibi Official Music Video Release 2017" }, "viewCount": "7434" }
  
  switch = 'music';
  switchComponent(pathname) {
    this.switch = pathname;
  }
}
