import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VideosComponent } from './musicchart/channels/videos.component';
import { ChannelsComponent } from './musicchart/channels/channels.component';
import { PlaylistsComponent } from './musicchart/playlists/playlists.component';
import { VideoComponent } from './musicchart/channels/video/video.component';
import { YoutubeApi } from './musicchart/youtube-api';
import { MusicChartDbaseService } from './musicchart/dbase.service';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    ChannelsComponent,
    PlaylistsComponent,
    VideoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [YoutubeApi, MusicChartDbaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
