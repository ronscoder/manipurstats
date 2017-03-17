import { Injectable } from '@angular/core';
import { initializeApp, database } from 'firebase'

// <script src="https://www.gstatic.com/firebasejs/3.7.1/firebase.js"></script>
// <script>
//   // Initialize Firebase
var config = {
  apiKey: "AIzaSyA3OivzZxVBez8dxCMCF1AAvAgBU5Ez10o",
  authDomain: "manipurstats.firebaseapp.com",
  databaseURL: "https://manipurstats.firebaseio.com",
  storageBucket: "manipurstats.appspot.com",
  messagingSenderId: "399946708137"
};
//   firebase.initializeApp(config);
// </script>
initializeApp(config);

@Injectable()
export class MusicChartDbaseService {
  constructor() { }
  // offline = true;
  addChannel(channelID) {
    return database().ref('/music_chart/channels').push(channelID)
  }
  getChannels() {
    return database().ref('/music_chart/channels');
  }
  addPlaylist(playlistID) {
    return database().ref('/music_chart/playlists').push(playlistID)
  }
  getPlaylist() {
    return database().ref('/music_chart/playlists');
  }

  lastUpdateDate() {
    return database().ref('/music_chart/last_update_date')
  }
  setLastUpdateDate() {
    return database().ref('/music_chart/last_update_date').set(Date.now())
  }
  snapWeekVideos(videos) {
    return database().ref('/music_chart/videos').push({ date: Date.now(), videos: videos })
  }
  getSnapVideos() {
    return database().ref('/music_chart/videos');
  }
}
