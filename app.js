const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();
const PORT = process.env.PORT || 8080; // process.env accesses heroku's environment variables

app.use(express.static("dist"));

app.get("/", (request, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// create route to get single book by its isbn
app.get("/pubg/gamertag/:matchId", (req, res) => {
  // make api call using fetch
    const gameInit = {
        method: 'get',
        headers: {
            Accept: 'application/vnd.api+json'
        }
    }

    let request = new Request(`https://api.pubg.com/shards/xbox/matches/${ req.params.matchId }`, gameInit);
    return fetch(request).then(function(response) {
        if(response.ok) {
            return response.json().then(match => {
                res.send(match)
            })
        }
    })
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});