import '../src/styles/index.scss';
import { getMatch, getPlayerByName, getTwitchUser, getTelemetry, getVideos, getPubgVideos, timeGreaterThan, timeGreaterThan2, timestamp } from './scripts/search_utilities';
import "regenerator-runtime/runtime";

document.addEventListener("DOMContentLoaded", () => {
    let BLACKLISTED = {};
    let gamertag = document.getElementsByClassName("gamertag-field")[0].value;
    document.querySelector(".fa-search").addEventListener("click", getPlayer);

    let actualMatches = [];
    let events = [];
    let telemetryEvents = [];
    let clips = [];
    async function getPlayer() {
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
                    telemetryEvents.push(log)
                }
            })
        })
        // console.log(telemetryEvents)
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
                                        }
                                    })
                                    if(clip.data) {
                                        if(clip.data.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                            if(timeGreaterThan(eventTimestamp, clip.data.created_at) && timeGreaterThan2(eventTimestamp, clip.data.created_at, clip.data.length)) {

                                                clips.push({"url": clip.data.url, "timestampInSeconds": timestamp(eventTimestamp, clip.data.created_at, clip.data.length), "event": tEvent, "vod": clip.data})
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
        }
        let final = await Promise.allSettled(clips);
        console.log(final);
    }
})