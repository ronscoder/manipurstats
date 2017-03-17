import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { YoutubeApi } from '../youtube-api';
import { MusicChartDbaseService } from '../dbase.service';

// declare var admin: any;
@Component({
  selector: 'musicchannels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
  providers: [YoutubeApi, MusicChartDbaseService]
})
export class ChannelsComponent implements OnInit {

  constructor(
    private api: YoutubeApi,
    private dbase: MusicChartDbaseService
  ) { }
  admin = true;
  channels = [];
  channelIDs = [];
  channelToAdd = null;
  playlists = [];
  playlists_db = [];
  status = null;
  selectedChannelID = null;
  ngOnInit() {
    //Load existing channels
    this.loadChannel();
    //Load existing playlists
    this.loadPlaylists((res) => {
      this.playlists_db = Object.keys(res).map((key) => {
        return res[key];
      });
      console.log(this.playlists_db)
    })
  }


  loadPlaylists(cb) {
    this.dbase.getPlaylist().once('value',
      snap => {
        cb(snap.exportVal());
      }
    )
  }


  loadChannel() {
    this.dbase.getChannels().once('value',
      snap => {
        // console.log(snap.exportVal());
        let channelIDs = snap.exportVal();
        for (let key in channelIDs) {
          let channelID = channelIDs[key].id;
          this.api.getChannelDetails(null, channelID).subscribe(
            res => {
              // console.log(res.json());
              // console.log(channelIDs[key]);
              this.channels.push(res.json());
              this.channelIDs.push(channelID);
            }
          );
        }
      }
    )
  }


  getChannel(newchannelForm: NgForm) {
    // console.log(newchannelForm.value['channelName']);
    this.api.getChannelDetails(newchannelForm.value['channelName'], newchannelForm.value['channelId']).subscribe(
      res => {
        // console.log(res.json());
        this.channelToAdd = res.json();
        if (this.channelToAdd.items.length < 1) {
          this.channelToAdd = null;
          this.status = "No such channel";
          return;
        }
        newchannelForm.resetForm();
        this.getAddButtonText();
      }
    );
  }


  addThisChannel() {
    this.dbase.addChannel(this.channelToAdd.items[0].id).then(
      resolved => {
        this.channels.push(this.channelToAdd)
        // console.log(resolved);
        this.channelToAdd = null;
      }
    )
  }


  disableAdd = false;
  addBtnText = "Add to list"

  getAddButtonText() {
    let addId = this.channelIDs.find((val) => {
      return val == this.channelToAdd.items[0].id;
    });
    if (addId) {
      //Already in the list
      this.disableAdd = true;
      this.addBtnText = "Already in the list"
    }
    else {
      this.disableAdd = false;
      this.addBtnText = "Add to list"
    }
  }

  addPlaylist(playlistID) {
    //if not existing playlist, add

    this.dbase.addPlaylist(playlistID).then(
      resolved => {
        console.log("good");
      })
  }

  // disableAddPlaylist = false;
  // addPlaylistText = "Add";
  checkPlaylistIDExists(playlistID) {
    if (!this.playlists_db)
      return true;
    // console.log('check existing playlist for id: ' + playlistID)

    return this.playlists_db.find((val) => {
      // console.log('check against: ' + val)
      return val == playlistID;
    });

  }


  getPlaylists(channelID, token) {
    if (!token)
      token = ""
    this.selectedChannelID = channelID;
    console.log(token);
    this.api.getPlaylists(channelID, token).subscribe(
      res => {
        this.playlists = res.json();
        // console.log(this.playlists);
      }
    )
  }

  getNextPlaylists(token) {
    // console.log('token:' + token)
    this.getPlaylists(this.selectedChannelID, token);
  }
}

