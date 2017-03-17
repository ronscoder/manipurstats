import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { YoutubeApi } from '../youtube-api'
import { MusicChartDbaseService } from '../dbase.service';
// import '../../gviz-api.js';
declare var google: any;

//Youtube API key:  AIzaSyCBkIn6I8nslS0H8g5SqtEkqoYJfHIfJ5U
@Component({
    selector: 'videos-component',
    templateUrl: './videos.component.html',
    providers: [YoutubeApi, MusicChartDbaseService]
})
export class VideosComponent implements OnInit {
    data: any[] = [];
    user;
    videos = [];
    top10 = [];
    lastUpdateDate;
    constructor(
        private http: Http,
        private api: YoutubeApi,
        private db: MusicChartDbaseService
    ) { }
    ngOnInit() {
        // this.getTopVideos();
        // this.getNewUploads();
        this.http.get('./app/musicchart/sample.json').subscribe(
            (val) => {
                let videosJSON = val.json().videos;
                for (let key in videosJSON) {
                    this.videos = videosJSON[key].videos;
                }
                this.setVideos();
            }
        )
        // this.loadTopVideos();

    }
    videoList = [];
    setVideos() {
        let videoList = [];
        Object.keys(this.videos).forEach((value) => {
            let items = this.videos[value].items;
            // console.log(items)
            Object.keys(items).forEach(val => {
                this.videoList.push(items[val])
            })
        })
        // console.log(this.videoList)
    }

    loadTopVideos() {
        this.db.getChannels().once('value',
            data => {
                let channels = data.toJSON();
                // console.log(channels)
                this.db.lastUpdateDate().once('value',
                    value => {
                        this.lastUpdateDate = value.toJSON();
                        if (this.ifRequireUpdate()) {
                            //CAREFUL: get data from youtube api 
                            let channel_count = Object.keys(channels).length - 1
                            // console.log(channel_count);
                            Object.keys(channels).forEach((val, i) => {
                                let channelId = channels[val]
                                console.log('channel# ' + i)
                                this.api.getTopViewed(channelId, this.lastUpdateDate.toISOString()).subscribe(
                                    values => {
                                        let videos = values.json();
                                        this.videos.push(videos);
                                        if (i > channel_count - 1) {
                                            //update on last
                                            this.db.snapWeekVideos(this.videos);
                                            this.db.setLastUpdateDate();
                                            this.setVideos();
                                        }
                                    }
                                )
                            })
                        }
                        else {
                            console.log('Retrieving from cache...')
                            this.db.getSnapVideos().once('value',
                                res => {
                                    let videosJSON = res.exportVal();
                                    for (let key in videosJSON) {
                                        this.videos = videosJSON[key].videos;
                                    }
                                    // console.log(this.videos);
                                    this.setVideos();
                                })
                        }
                    })
            }
        )

    }
    getTopVideos(channelid, publishDateCat, cb) {
        switch (publishDateCat) {
            case 'week1':
                break;
            default:
                break;
        }
        //Check today's date
        console.log('retrieve video from Youtube');

        cb();
    }

    ifRequireUpdate() {
        if (this.lastUpdateDate == null) {
            this.lastUpdateDate = new Date(2017, 2, 11, 9)
            return true
        }
        let diff_days = (Date.now() - this.lastUpdateDate) / (1000 * 60 * 59 * 24);
        console.log(diff_days)
        if (diff_days >= 7) {
            return true
        }
        else
            return false
    }


    getNewUploads() {
        this.db.getChannels().once('value',
            data => {
                let channels = data.exportVal();
                for (let key in channels) {
                    this.getPlaylistItems(channels[key].items[0].contentDetails.relatedPlaylists.uploads);
                }
            }
        )
    }


    getPlaylistItems(playlistID: String) {
        this.api.getPlaylistItems(playlistID, "").subscribe(
            res => {
                let data = res.json();
                // console.log(data);
                // data.items.forEach(item => {
                //     // console.log(item);
                //     this.data.push([
                //         item.snippet.title,
                //         item.snippet.channelTitle,
                //         new Date(item.snippet.publishedAt)
                //     ]);
                // })
                // this.loadChart();
            }
        )
    }
    loadChart() {
        google.charts.load('current', { 'packages': ['table'] });
        google.charts.setOnLoadCallback(() => {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Title');
            data.addColumn('string', 'Channel');
            data.addColumn('date', 'Publish Date');
            data.addRows(
                this.data
            );
            var table = new google.visualization.Table(document.getElementById('table_div'));

            table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
        });
    }
    videoStats = [];
    stats(stats, video) {
        this.videoStats.push(stats);
        video['viewCount'] = stats.statistics.viewCount;
        // console.log(video);
        // console.log(this.videoStats.length);
        // console.log(this.videoList.length);
        if (this.videoStats.length == this.videoList.length) {
            //     console.log(this.videoStats);
            //     console.log(this.videoList);
            // }
            this.videoList.sort((a, b) => {
                return this.videoStats.find(val => {
                    // console.log(val.id + b.id)
                    return val.id == b.id.videoId;
                }).statistics.viewCount - this.videoStats.find(val => {
                    // console.log(val.id + a.videoId)
                    return val.id == a.id.videoId;
                }).statistics.viewCount
            })
        }
    }
}


