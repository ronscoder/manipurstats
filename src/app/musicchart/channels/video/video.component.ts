import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YoutubeApi } from '../../youtube-api'
import { MusicChartDbaseService } from '../../dbase.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var YT: any;
declare var loadYTPlayer: any;
declare var player: any;
@Component({
  selector: 'videoComp',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input() getStat: boolean;
  @Input() video;
  @Output() stats = new EventEmitter<any>();
  play = false;
  viewCount = 100000;
  playVideoURL;
  constructor(
    private api: YoutubeApi,
    private db: MusicChartDbaseService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // this.stats.emit(200);
    let rawPlayVideoURL =
      "http://www.youtube.com/embed/" + this.video.id.videoId + "?enablejsapi=1&origin=http://manipurstats.com";
    this.playVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(rawPlayVideoURL);
    if (this.getStat)
      this.api.getVideo(this.video.id.videoId, 'statistics').subscribe(
        val => {
          // console.log('dont exe for getStat=' + this.getStat)
          this.viewCount = val.json().items[0].statistics.viewCount;
          this.stats.emit(val.json().items[0]);
          // console.log(val.json())
        }
      )
    // console.log(this.video);
  }

  loadPlayer() {
    console.log('loading youtube player...')
    this.play = true;
    // loadYTPlayer();
  }

  closePlayer() {
    this.play = false;
    //do some clean up
    // player.stopVideo();
    // YT = null;
  }
}


