import '../src/styles/index.scss';
import { getMatch, getPlayerByName, getTwitchUser, getTelemetry, getVideos, getPubgVideos, timeGreaterThan, timeGreaterThan2, timestamp } from './scripts/search_utilities';
import "regenerator-runtime/runtime";
import { noVideosFound, videosFound } from './scripts/no_videos_found';
import { displayStreams } from './scripts/streams';

document.addEventListener("DOMContentLoaded", () => {
    let BLACKLISTED = {};
    let kAV = [];
    let actual;
    let streams = [];
    document.getElementsByClassName("fa-github")[0].addEventListener('click', () => {
        window.open("https://github.com/iSWATxJOKERi/CLIPD")
    })
    document.getElementsByClassName("fa-linkedin-in")[0].addEventListener('click', () => {
        window.open("https://www.linkedin.com/in/lawrence-menyah-448597117/")
    })
    document.getElementsByClassName("fa-angellist")[0].addEventListener('click', () => {
        window.open("https://angel.co/u/iswatxjokeri")
    })

    const container = document.getElementsByClassName("getStreams")[0];
    document.querySelector(".fa-search").addEventListener("click", getPlayer);

    const input = document.createElement("section");
    input.classList.add("input-container");
    input.style.display = "none";
    const un = document.createElement("input");
    un.setAttribute("type", "text");
    un.setAttribute("placeholder", "Twitch User");
    un.classList.add("un-field");
    input.appendChild(un);
    const gt = document.createElement("input");
    gt.setAttribute("type", "text");
    gt.setAttribute("placeholder", "PUBG User");
    gt.classList.add("gt-field");
    input.appendChild(gt);
    const submit = document.createElement("span");
    submit.classList.add("submit-stream");
    submit.innerHTML = "Search";
    input.appendChild(submit);
    container.appendChild(input);

    document.getElementById("getStreams").addEventListener("click", e => {
        if(input.style.display === "flex") {
            input.style.display = "none";
        }else {
            input.style.display = "flex";
        }
    })

    document.querySelector(".submit-stream").addEventListener("click", getInput);

    async function getInput() {
        const uname = document.getElementsByClassName("un-field")[0].value;
        const gtag = document.getElementsByClassName("gt-field")[0].value;

        let a;
        if(uname && gtag) {
            const fp = document.createElement("span");
            fp.classList.add("loading1", "load");
            fp.innerHTML = 'Fetching Videos ...';
            input.appendChild(fp);
            a = setInterval(() => {
                fp.style.display = "none"
                setTimeout(() => {
                    fp.style.display = "inline"
                }, 1000)
            }, 2000)
        }

        let allVids = await getStreams(uname, gtag);
        allVids ? clearInterval(a) : null;
        displayStreams(kAV, allVids, gtag);


        async function getStreams(uname, gtag) {
            let matches = await getPlayerByName(gtag);
            // console.log(matches);
            actual = matches.map(async match => {
                return await getMatch(match.id)
            })
    
            let games = await Promise.allSettled(actual);
            // console.log(games)
    
            games.forEach(async match => {
                if(match.value){
                    if(match.value.included) {
                        match.value.included.forEach(async ele => {
                            if(ele.id === match.value.data.relationships.assets.data[0].id) {
                                events.push(getTelemetry(ele.attributes.URL))
                            }
                        })
                    }
                }
            })
    
            let telemetry = await Promise.allSettled(events);
    
            // console.log(telemetry)
            telemetry.forEach(event => {
                event.value.forEach(log => {
                    if(((log._T === "LogPlayerKill" && log.killer) && log.killer.name === gtag) || ((log._T === "LogPlayerKill" && log.victim) && log.victim.name === gtag)){
                        kAV.push(log)
                    }
                })
            })
            // console.log(kAV);
            
            let twitchUser = await getTwitchUser(uname);
            if(twitchUser) {
                if(twitchUser.data.length > 0) {
                    let videos = await getVideos(twitchUser.data[0].id);
                    if(videos.data.length > 0) {
                        let clips = [];
                        for(const vid of videos.data) {
                            clips.push(getPubgVideos(vid.id));
                        }
                        let c = await Promise.all(clips);
                        // console.log(c);
                        streams = c.filter(ele => ele.game === "PLAYERUNKNOWN'S BATTLEGROUNDS");
                        // debugger
                        // console.log(streams);
                        return streams;
                    }
                }
            }
        }
    }

    let actualMatches = [];
    let events = [];
    let telemetryEvents = [];
    let clips = [];
    async function getPlayer() {
        let gamertag = document.getElementsByClassName("gamertag-field")[0].value;
        const splash = document.getElementById("getStreams");
        const logo = document.getElementsByClassName("logo")[0];
        const fetchingPlayer = document.createElement("span");
        fetchingPlayer.classList.add("loading1", "loading");
        fetchingPlayer.innerHTML = 'Fetching Player ...';
        splash.appendChild(fetchingPlayer);
        let ape4;
        ape4 = setInterval(() => {
            fetchingPlayer.style.display = "none";
            setTimeout(() => {
                fetchingPlayer.style.display = "inline";
            }, 500)
        }, 1000)
        let matches = await getPlayerByName(gamertag);
        matches ? clearInterval(ape4) : null;
        // console.log(matches);
        // debugger
        actualMatches = matches.map(async match => {
            return await getMatch(match.id)
        })

        fetchingPlayer.style.display = "none";
        const fetchingMatches = document.createElement("span");
        fetchingMatches.classList.add("loading2", "loading");
        fetchingMatches.innerHTML = 'Fetching Matches ...';
        splash.appendChild(fetchingMatches);
        let ape3;
        ape3 = setInterval(() => {
            fetchingMatches.style.display = "none";
            setTimeout(() => {
                fetchingMatches.style.display = "inline";
            }, 500)
        }, 1000)
        let games = await Promise.allSettled(actualMatches);
        games ? clearInterval(ape3) : null;
        // console.log(games)


        fetchingMatches.style.display = "none";
        const fetchingEvents = document.createElement("span");
        fetchingEvents.classList.add("loading3", "loading");
        fetchingEvents.innerHTML = 'Fetching Events ...';
        splash.appendChild(fetchingEvents);
        let ape;
        ape = setInterval(() => {
            fetchingEvents.style.display = "none";
            setTimeout(() => {
                fetchingEvents.style.display = "inline";
            }, 500)
        }, 1000)

        games.forEach(async match => {
            if(match.value){
                if(match.value.included) {
                    match.value.included.forEach(async ele => {
                        if(ele.id === match.value.data.relationships.assets.data[0].id) {
                            events.push(getTelemetry(ele.attributes.URL))
                        }
                    })
                }
            }
        })

        let telemetry = await Promise.allSettled(events);
        telemetry ? clearInterval(ape) : null;

        fetchingEvents.style.display = "none";
        const fetchingKillsAndDeaths = document.createElement("span");
        fetchingKillsAndDeaths.classList.add("loading4", "loading");
        fetchingKillsAndDeaths.innerHTML = 'Fetching Kills and Deaths ...';
        splash.appendChild(fetchingKillsAndDeaths);

        // console.log(telemetry)
        telemetry.forEach(event => {
            event.value.forEach(log => {
                if(((log._T === "LogPlayerKill" && log.killer) && log.killer.name === gamertag) || ((log._T === "LogPlayerKill" && log.victim) && log.victim.name === gamertag)){
                    telemetryEvents.push(log)
                }
            })
        })
        // console.log(telemetryEvents)
        fetchingKillsAndDeaths.style.display = "none";
        const fetchingVideos = document.createElement("span");
        fetchingVideos.classList.add("loading5", "loading");
        fetchingVideos.innerHTML = 'Fetching Videos ...';
        splash.appendChild(fetchingVideos);
        let ape2;
        ape2 = setInterval(() => {
            fetchingVideos.style.display = "none";
            setTimeout(() => {
                fetchingVideos.style.display = "inline";
            }, 500)
        }, 1000)
        for(const tEvent of telemetryEvents) {
            let eventTimestamp = tEvent._D;
            if(tEvent.killer) {
                if(!BLACKLISTED[tEvent.killer.name]){
                    let twitchUser = await getTwitchUser(tEvent.killer.name);
                    if(twitchUser) {
                        if(twitchUser.data.length > 0) {
                            let videos = await getVideos(twitchUser.data[0].id);
                            if(videos.data.length > 0) {
                                videos.data.map(async vid => {
                                    let clip = await getPubgVideos(vid.id);
                                    if(clip) {
                                        // debugger
                                        if(clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                            // debugger
                                            if(timeGreaterThan(eventTimestamp, clip.created_at) && timeGreaterThan2(eventTimestamp, clip.created_at, clip.length)) {
                                                clips.push({"url": clip.url, "timestampInSeconds": timestamp(eventTimestamp, clip.created_at, clip.length), "event": tEvent, "vod": clip})
                                            }
                                        }
                                    }
                                })
                            }
                            BLACKLISTED[tEvent.killer.name] = tEvent.killer.name;
                        }
                    } else {
                        BLACKLISTED[tEvent.killer.name] = tEvent.killer.name;
                    }
                }
            }
            if(tEvent.victim) {
                if(!BLACKLISTED[tEvent.victim.name]){
                    let twitchUser = await getTwitchUser(tEvent.victim.name);
                    if(twitchUser) {
                        if(twitchUser.data.length > 0) {
                            let videos = await getVideos(twitchUser.data[0].id);
                            if(videos.data.length > 0) {
                                // console.log(videos.data.length)
                                videos.data.map(async vid => {
                                    let clip = await getPubgVideos(vid.id);
                                    if(clip) {
                                        // debugger
                                        if(clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                            // debugger
                                            if(timeGreaterThan(eventTimestamp, clip.created_at) && timeGreaterThan2(eventTimestamp, clip.created_at, clip.length)) {
                                                clips.push({"url": clip.url, "timestampInSeconds": timestamp(eventTimestamp, clip.created_at, clip.length), "event": tEvent, "vod": clip})
                                                // console.log(clips)
                                            }
                                        }
                                    }
                                })
                            }
                        }
                        BLACKLISTED[tEvent.victim.name] = tEvent.victim.name;
                    } else {
                        BLACKLISTED[tEvent.victim.name] = tEvent.victim.name;
                    }
                }
            }
        }
        // console.log(clips);
        let final = await Promise.allSettled(clips);
        // console.log(final);
        if(final.length === 0) {
            fetchingVideos.style.display = "none";
            logo.style.display = "none";
            final ? clearInterval(ape2) : null;
            noVideosFound(gamertag);
        } else {
            logo.style.display = "none";
            fetchingVideos.style.display = "none";
            final ? clearInterval(ape2) : null;
            videosFound(gamertag, final);
        }
    }
})