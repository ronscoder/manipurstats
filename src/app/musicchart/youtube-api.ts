import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class YoutubeApi {
    constructor(
        private http: Http
    ) { }

    private KEY = 'AIzaSyCBkIn6I8nslS0H8g5SqtEkqoYJfHIfJ5U';

    getChannelDetails(username?: string, id?: string) {
        if (id) {
            // console.log('id:' + id.length);
            return this.http.get('https://www.googleapis.com/youtube/v3/channels?part=id%2Csnippet%2C+contentDetails&id=' + id + '&key=' + this.KEY);
        }
        else if (username) {
            // console.log('username:' + username.length);
            return this.http.get('https://www.googleapis.com/youtube/v3/channels?part=id%2Csnippet%2C+contentDetails&forUsername=' + username + '&key=' + this.KEY);
        }

    }

    getPlaylists(channelID, nextPageToken) {
        return this.http.get('https://www.googleapis.com/youtube/v3/playlists?part=contentDetails%2Csnippet&channelId=' + channelID +
            '&pageToken=' + nextPageToken + '&key=' + this.KEY)
    }
    getPlaylistItems(playlistID, nextPageToken) {
        //VideoID = resourceId.videoId
        return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + playlistID + '&pageToken=' + nextPageToken + '&key=' + this.KEY + 'maxResults=50')
    }
    getVideo(videoID, part) {
        // "statistics": {
        //     "viewCount": "96508",
        //     "likeCount": "242",
        //     "dislikeCount": "48",
        //     "favoriteCount": "0",
        //     "commentCount": "38"
        //    }
        if (part == null)
            part = 'snippet%2Cstatistics';
        return this.http.get('https://www.googleapis.com/youtube/v3/videos?part=' + part + '&id=' + videoID + '&key=' + this.KEY)
    }
    getTopViewed(channelID, publishedAfter) {
        return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelID + '&key=' + this.KEY + '&maxResults=10' + '&order=viewCount' + '&publishedAfter=' + publishedAfter)
    }
}