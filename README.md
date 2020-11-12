# CLIPD

[CLIPD](https://clipd.herokuapp.com) is a web application that allows users to search for a PUBG gamertag or a Twitch username and watch the point in time that they were killed by a streamer or when they killed a streamer.

## Technology
### Twitch API, PUBG API, JavaScript , Express , HTML5 , SCSS , Heroku , Webpack
<br/>
<div><img src="/src/images/clipd.PNG" alt="index"></div>
<br/>

## Functionality
### You can:
* Search for a user by entering their PUBG Gamertag and you will clips of the point in time you killed a streamer or a streamer killed you.

<img src="/src/images/clipd2.gif" alt="search">
<img src="/src/images/clipd3.gif" alt="search2">

## OR
* If you want to watch all the kills and deaths of a streamer, and you know their PUBG Gamertag AND their Twitch username, then you can!

<img src="/src/images/clipd4.gif" alt="search3">

* All the kills and deaths for that streamer will be on the left-side, so you have choose which kills and deaths you want to see.

<img src="/src/images/clipd5.gif" alt="search4">

## How did I do it?
To get this to work, I used the PUBG API to fetch the user by gamertag. Then received all the matches that the player has played in the past two weeks. For each of those matches, I grabbed the telemetry events(which PUBG collects for each match, and these events holds every event that occurs in a match) where the searched user was killed or got a kill. Then with that information, for each telemetry event, I called the TWITCH API to see if the killer or the victim had a Twitch account with the same gamertag, and also if they had PUBG VODS(video-on-demands). Then, I checked if the telemetry events timestamp fell between the created_at and published_at dates of a PUBG VOD. If that rang true, then it meant the telemetry event occurred on stream. I then grabbed that video and showed the user that video at the telemetry event's timestamp.

