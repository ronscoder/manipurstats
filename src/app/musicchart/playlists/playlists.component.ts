import { Component, OnInit, Input } from '@angular/core';
import { MusicChartDbaseService } from '../dbase.service';
import { YoutubeApi } from '../youtube-api';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  @Input() channelID;
  playlists = [];
  constructor(
    private api: YoutubeApi,
    private dbase: MusicChartDbaseService
  ) { }
  ngOnInit() {
    // this.dbase
  }
}
