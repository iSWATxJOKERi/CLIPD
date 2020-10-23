const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
// require("dotenv").config();
const Key = require('./src/config/keys');
const { debug } = require("console");
const PORT = process.env.PORT || 8080; // process.env accesses heroku's environment variables

app.use(express.static("dist"));

app.get("/", (request, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});


app.get("/pubg/gamertag/:name", (req, res) => {
  const playerByNameInit = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${ Key.pubgAPI }`,
      Accept: 'application/vnd.api+json'
    }
  }
  
  let request = new fetch.Request(`https://api.pubg.com/shards/xbox/players?filter[playerNames]=${ req.params.name }`, playerByNameInit);
  return fetch(request).then(function(response) {
    if(response.ok) {
      return response.json().then(json => {
        res.send(json.data[0].relationships.matches.data);
      })
    }
  })
})

app.get("/pubg/matches/:matchId", (req, res) => {
  // make api call using fetch
    const gameInit = {
        method: 'get',
        headers: {
          Accept: 'application/vnd.api+json'
        }
    }
    // debugger
    let request = new fetch.Request(`https://api.pubg.com/shards/xbox/matches/${ req.params.matchId }`, gameInit);
    // debugger
    return fetch(request).then(function(response) {
      if(response.ok) {
        return response.json().then(match => {
          res.send(match)
        })
      }
    })
});

app.get("/pubg/telemetry", (req, res) => {
  const telemetryInit = {
    method: 'get',
    headers: {
      Accept: 'application/vnd.api+json'
    }
  }

  let request = new fetch.Request(req.query.url, telemetryInit);
  // debugger
  return fetch(request).then(function(response) {
    if(response.ok) {
      return response.json().then(json => {
        res.send(json)
      })
    }
  })
})

app.get("/oauth", (req, res) => {
  const oauthInit = {
    method: 'post',
    // scope: 'user:read:email'
  }
  let request = new fetch.Request(`https://id.twitch.tv/oauth2/token?client_id=${ Key.twitchAPI }&client_secret=${ Key.clientSECRET }&grant_type=client_credentials`, oauthInit);
  return fetch(request).then(function(response) {
    if(response.ok) {
      return response.json().then(json => {
        res.send(json)
      })
    }
  })
})

app.get("/twitch/:user", (req,res) => {
  const twitchUserInit = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${ Key.oAUTH }`,
      'Client-Id': `${ Key.twitchAPI }`
    }
  }
  let request = new fetch.Request(`https://api.twitch.tv/helix/users?login=${ req.params.user }`, twitchUserInit);
  return fetch(request).then(function(response) {
    if(response.ok){
      return response.json().then(json=> {
        res.send(json)
      })
    } else {
      res.send(false)
    }
  })
})

app.get("/twitchvideos/:userId", (req, res) => {
  const twitchVideosInit = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${ Key.oAUTH }`,
      'Client-Id': `${ Key.twitchAPI }`
    }
  }
  let request = new fetch.Request(`https://api.twitch.tv/helix/videos?user_id=${ req.params.userId }`, twitchVideosInit);
  return fetch(request).then(function(response) {
    if(response.ok) {
      return response.json().then(json => {
        res.send(json)
      })
    }
  })

})

app.get("/pubgvideos/:videoId", (req, res)=> {
  const twitchPubgInit = {
    method: 'get',
    headers: {
      "Accept": "application/vnd.twitchtv.v5+json",
      'Client-Id': `${ Key.twitchAPI }`
    }
  }
  let request = new fetch.Request(`https://api.twitch.tv/kraken/videos/${ req.params.videoId }`, twitchPubgInit);
  return fetch(request).then(function(response) {
    if(response.ok) {
      return response.json().then(json => {
        res.send(json)
      })
    } else {
      res.send(false)
    }
  })
})

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});