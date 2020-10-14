export const noVideosFound = (gamertag) => {
    const splash = document.getElementsByClassName("splash-content")[0];
    splash.style.display = "none";
    const parent = document.createElement("section")
    const button = document.createElement("span");
    button.innerHTML = '&larr;';
    parent.appendChild(button);
    const container = document.createElement("section");
    parent.classList.add("parent-container");
    const player = document.createElement("div");
    player.innerHTML = `<h2>${ gamertag }</h2>`;
    container.appendChild(player);
    const message = document.createElement("div");
    message.innerHTML = '<p>No videos found for this user</p>';
    container.appendChild(message);
    parent.appendChild(container);
    document.body.appendChild(parent);

    button.onclick = function() {
        splash.style.display = "flex";
        parent.style.display = "none";
    }
}