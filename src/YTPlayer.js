var YT;
function loadYTPlayer() {
    console.log('loading YT Player...');
    // 2. This code loads the IFrame Player API code asynchronously.
    if (!window['YT']) { YT = { loading: 0, loaded: 0 }; } if (!window['YTConfig']) { var YTConfig = { 'host': 'http://www.youtube.com' }; } if (!YT.loading) { YT.loading = 1; (function () { var l = []; YT.ready = function (f) { if (YT.loaded) { f(); } else { l.push(f); } }; window.onYTReady = function () { YT.loaded = 1; for (var i = 0; i < l.length; i++) { try { l[i](); } catch (e) { } } }; YT.setConfig = function (c) { for (var k in c) { if (c.hasOwnProperty(k)) { YTConfig[k] = c[k]; } } }; var a = document.createElement('script'); a.type = 'text/javascript'; a.id = 'www-widgetapi-script'; a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vflaVmuxD/www-widgetapi.js'; a.async = true; var b = document.getElementsByTagName('script')[0]; b.parentNode.insertBefore(a, b); })(); }
}


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}