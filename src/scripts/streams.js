import { timeGreaterThan, timeGreaterThan2, timestamp } from './scripts/search_utilities';

export const displayStreams = (events, videos) => {
    const splash = document.getElementsByClassName("splash-content")[0];
    splash.style.display = "none";
    
    let vidsToShow = [];
    events.forEach(event => {
        videos.forEach(clip => {
            if(timeGreaterThan(event._D, clip.created_at) && timeGreaterThan2(event._D, clip.created_at, clip.length)) {
                // debugger
                vidsToShow.push({"urlssss": clip.url, "timestampInSeconds": timestamp(event._D, clip.created_at, clip.length), "event": event, "vod": clip})
            }
        })
    })


}