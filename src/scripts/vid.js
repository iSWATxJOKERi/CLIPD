function vid() {
    var options = {
        width: 970,
        height: 540,
        video: "v769618078"
    };
    var player = new Twitch.Player("1", options);
    player.setVolume(0.5);
    document.querySelectorAll('.nostylist').forEach(event => {
        event.addEventListener('click', () => {
            player.seek(Number(event.id));
        })
    })
}