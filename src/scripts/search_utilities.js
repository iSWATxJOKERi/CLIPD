import Key from '../config/keys';

export const getPlayerByName = gamertag => {
    const playerByNameInit = {
        method: 'get'
    }
    
    // let request = new Request(`https://api.pubg.com/shards/xbox/players?filter[playerNames]=${ gamertag }`, playerByNameInit);
    let request = new Request(`/pubg/gamertag/${ gamertag }`, playerByNameInit)
    return fetch(request).then(function(response) {
        return response.json()
    })
}
// window.getPlayerByName = getPlayerByName;

export const getMatch = (matchId) => {
    const gameInit = {
        method: 'get',
    }

    // let request = new Request(`https://api.pubg.com/shards/xbox/matches/${ matchId }`, gameInit);
    let request = new Request(`/pubg/matches/${ matchId }`, gameInit)
    return fetch(request).then(function(response) {
        return response.json()
    })
}
// window.getMatch = getMatch;
//
export const getTelemetry = (url) => {
    const telemetryInit = {
        method: 'get',
    }

    let request = new Request(`/pubg/telemetry/?url=${ url }`, telemetryInit);
    return fetch(request).then(function(response) {
        return response.json()
    })
}
// window.getTelemetry = getTelemetry;

export const getOAuth = () => {
    const oauthInit = {
        method: 'get',
        // scope: 'user:read:email'

    }
    let request = new Request(`/oauth`, oauthInit);
    return fetch(request).then(function(response) {
        return response.json()
    })
}
// window.getOAuth = getOAuth;


export const getTwitchUser = gamertag => {
    const twitchUserInit = {
        method: 'get'
    }
    let request = new Request(`/twitch/${ gamertag }`, twitchUserInit);
    return fetch(request).then(r => {
        return r.json().then(json => {
          return json
        })
    })
}
// window.getTwitchUser = getTwitchUser;

export const getVideos = userId => {
    const twitchVideosInit = {
        method: 'get',
    }
    let request = new Request(`/twitchvideos/${ userId }`, twitchVideosInit);
    return fetch(request).then(function(response) {
        return response.json()
    })
}
// window.getVideos = getVideos;

export const getPubgVideos = videoId => {
    const twitchPubgInit = {
        method: 'get',
    }
    let request = new Request(`/pubgvideos/${ videoId }`, twitchPubgInit);
    return fetch(request).then(function(response) {
        return response.json()
    })
}

// window.getPubgVideos = getPubgVideos;


export const timeGreaterThan = (t1, t2) => {
    // debugger
    let t3 = new Date(t1);
    let t4 = new Date(t2);

    if(t3 >= t4) {
        return true
    } else {
        return false
    }
}

export const timeGreaterThan2 = (t1, t2, seconds) => {
    // debugger
    let t3 = new Date(t1);
    let t4 = new Date(t2);
    t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() + seconds);
    if (t3 <= t4) {
        return true
    } else {
        return false
    }
    // let hours = t4.getHours();
    // let minutes = t4.getMinutes();
    // let secs = t4.getSeconds();
    // if(seconds + sec < 60) {
    //     t4.setHours(hours, minutes, seconds + secs)
    // } else if(seconds + sec === 60) {
    //     t4.setHours(hours, minutes + 1, 0)
    // } else if(seconds + sec > 60) {
    //     let newSecs = (seconds + sec) % 60;
    //     let newMinutes = ((seconds + sec) - newSecs) / 60;
    //     let min;
    //     let hours;
    //     if(newMinutes > 60) {
    //         min = newMinutes % 60;
    //         hours = (newMinutes - min) / 60;
    //     }
    // }
}

export const timestamp = (t1, t2, seconds) => {
    // debugger
    let t3 = new Date(t1);
    let t4 = new Date(t2);
    t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() + seconds);
    let secs = ((t4 - t3) / 1000);
    // let nT = t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() - secs);
    // let eventTimestamp = nT - (new Date(t2));
    let t = new Date(null);
    t.setSeconds((seconds - secs) - 10);
    let a = t.toISOString().substr(11, 8).split(":");
    return a[0] + "h" + a[1] + "m" + a[2] + "s"
}

export const timestamp2 = (t1, t2, seconds) => {
    let t3 = new Date(t1);
    let t4 = new Date(t2);
    t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() + seconds);
    let secs = ((t4 - t3) / 1000);
    let nT = t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() - secs);
    return ((nT - (new Date(t2))) / 1000) - 10;
}