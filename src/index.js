import '../src/styles/index.scss';
import { getMatch, getPlayerByName, getTwitchUser, getTelemetry, getVideos, getPubgVideos, timeGreaterThan, timeGreaterThan2, timestamp } from './scripts/search_utilities';
import "regenerator-runtime/runtime";
import { noVideosFound } from './scripts/no_videos_found';

document.addEventListener("DOMContentLoaded", () => {
    let BLACKLISTED = {};
    let kAV = [];
    let gamertag = document.getElementsByClassName("gamertag-field")[0].value;
    const container = document.getElementsByClassName("getStreams")[0];
    document.querySelector(".fa-search").addEventListener("click", getPlayer);
    document.querySelector("#getStreams").addEventListener("click", getInput);

    async function getInput() {
        const input = document.createElement("section");
        input.classList.add("input-container");
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
    }

    async function getStreams() {
        let matches = await getPlayerByName(gamertag);
        // console.log(matches);
        actualMatches = matches.map(async match => {
            return await getMatch(match.id)
        })

        let games = await Promise.allSettled(actualMatches);
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
                if(((log._T === "LogPlayerKill" && log.killer) && log.killer.name === gamertag) || ((log._T === "LogPlayerKill" && log.victim) && log.victim.name === gamertag)){
                    kAV.push(log)
                }
            })
        })
        
        const twitch = document.createElement("input");
        twitch.setAttribute("type", "text");
        twitch.setAttribute("placeholder", "Twitch Username...");
        twitch.classList.add("twitch-field");
        container.appendChild(twitch);
        let username = document.getElementsByClassName("twitch-field")[0].value;
        let twitchUser = await getTwitchUser(username).then(function(response) {
            if(response.ok) {
                return response.json().then(json => {
                    return json
                })
            } else {
                return false
            }
        })
        if(twitchUser) {
            if(twitchUser.data.length > 0) {
                let videos = await getVideos(twitchUser.data[0].id);
                if(videos.data.length > 0) {
                    videos.data.map(async vid => {
                        let clip = await getPubgVideos(vid.id).then(function(response) {
                            if(response.ok) {
                                return response.json()
                            }else {
                                return false
                            }
                        })
                        if(clip) {
                            // debugger
                            if(clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                // debugger
                                if(timeGreaterThan(eventTimestamp, clip.created_at) && timeGreaterThan2(eventTimestamp, clip.created_at, clip.length)) {
                                    // debugger
                                    clips.push({"url": clip.url, "timestampInSeconds": timestamp(eventTimestamp, clip.created_at, clip.length), "event": tEvent, "vod": clip})
                                }
                            }
                        }
                    })
                }
            }
        }
    }

    let actualMatches = [];
    let events = [];
    let telemetryEvents = [];
    let clips = [];
    async function getPlayer() {
        const splash = document.getElementsByClassName("splash-content")[0];
        const fetchingPlayer = document.createElement("span");
        fetchingPlayer.classList.add("loading1", "loading");
        fetchingPlayer.innerHTML = 'Fetching Player ...';
        splash.appendChild(fetchingPlayer);
        let matches = await getPlayerByName(gamertag);
        // console.log(matches);
        actualMatches = matches.map(async match => {
            return await getMatch(match.id)
        })

        fetchingPlayer.style.display = "none";
        const fetchingMatches = document.createElement("span");
        fetchingMatches.classList.add("loading2", "loading");
        fetchingMatches.innerHTML = 'Fetching Matches ...';
        splash.appendChild(fetchingMatches);

        let games = await Promise.allSettled(actualMatches);
        // console.log(games)


        fetchingMatches.style.display = "none";
        const fetchingEvents = document.createElement("span");
        fetchingEvents.classList.add("loading3", "loading");
        fetchingEvents.innerHTML = 'Fetching Events ...';
        splash.appendChild(fetchingEvents);

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
        for(const tEvent of telemetryEvents) {
            let eventTimestamp = tEvent._D;
            if(tEvent.killer) {
                if(!BLACKLISTED[tEvent.killer.name]){
                    let twitchUser = await getTwitchUser(tEvent.killer.name).then(function(response) {
                        if(response.ok) {
                            return response.json().then(json => {
                                return json
                            })
                        } else {
                            return false
                        }
                    })
                    if(twitchUser) {
                        if(twitchUser.data.length > 0) {
                            let videos = await getVideos(twitchUser.data[0].id);
                            if(videos.data.length > 0) {
                                videos.data.map(async vid => {
                                    let clip = await getPubgVideos(vid.id).then(function(response) {
                                        if(response.ok) {
                                            return response.json()
                                        }else {
                                            return false
                                        }
                                    })
                                    if(clip) {
                                        // debugger
                                        if(clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                            // debugger
                                            if(timeGreaterThan(eventTimestamp, clip.created_at) && timeGreaterThan2(eventTimestamp, clip.created_at, clip.length)) {
                                                // debugger
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
                    let twitchUser = await getTwitchUser(tEvent.victim.name).then(function(response) {
                        if(response.ok) {
                            return response.json().then(json => {
                                return json
                            })
                        } else {
                            return false
                        }
                    })
                    if(twitchUser) {
                        if(twitchUser.data.length > 0) {
                            let videos = await getVideos(twitchUser.data[0].id);
                            if(videos.data.length > 0) {
                                videos.data.map(async vid => {
                                    let clip = await getPubgVideos(vid.id).then(function(response) {
                                        if(response.ok) {
                                            return response.json()
                                        }else {
                                            return false
                                        }
                                    })
                                    if(clip) {
                                        // debugger
                                        if(clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                            // debugger
                                            if(timeGreaterThan(eventTimestamp, clip.created_at) && timeGreaterThan2(eventTimestamp, clip.created_at, clip.length)) {
                                                // debugger
                                                clips.push({"url": clip.url, "timestampInSeconds": timestamp(eventTimestamp, clip.created_at, clip.length), "event": tEvent, "vod": clip})
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
        let final = await Promise.allSettled(clips);
        console.log(final);
        if(final.length === 0) {
            fetchingVideos.style.display = "none";
            noVideosFound(gamertag);
        }
    }
})