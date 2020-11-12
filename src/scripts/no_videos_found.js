export const noVideosFound = (gamertag) => {
    const splash = document.getElementsByClassName("splash-content")[0];
    splash.style.display = "none";
    const logo = document.getElementsByClassName("logo")[0];
    logo.style.display = "none";
    const parent = document.createElement("section")
    const button = document.createElement("span");
    button.innerHTML = '&larr;';
    button.classList.add("back");
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
        window.location = '/';
    }
}

export const videosFound = (gamertag, clips) => {
    const splash = document.getElementsByClassName("splash-content")[0];
    splash.style.display = "none";
    const logo = document.getElementsByClassName("logo")[0];
    const parent = document.createElement("section")
    const button = document.createElement("span");
    button.innerHTML = '&larr;';
    button.classList.add("back");
    parent.appendChild(button);
    const container = document.createElement("section");
    parent.classList.add("parent-container");
    const player = document.createElement("div");
    player.innerHTML = `<h2>${ gamertag }</h2>`;
    container.appendChild(player);
    
    const listOfVids = document.createElement("ul");
    listOfVids.classList.add("list-of-vids");
    for(let i = 0; i < clips.length; i++) {
        const ul = document.createElement("ul");
        ul.innerHTML = `<h3>${ clips[i].value.event.killer.name }</h3><span>killing ${ clips[i].value.event.victim.name }</span>`;
        ul.classList.add(`${ clips[i].value.event.killer.name === gamertag ? "g" : "r" }`, "videoBox");
        const modal = document.createElement("section");
        modal.classList.add("modal");
        const div = document.createElement("div");
        div.setAttribute("id", `${ i }`);
        div.classList.add("vframe2");
        modal.appendChild(div);

        ul.appendChild(modal);
        listOfVids.appendChild(ul);
    }

    const btn = document.createElement("span");
    btn.innerHTML = '&#10006;';
    btn.classList.add("close");
    container.appendChild(listOfVids)
    parent.appendChild(container);
    parent.appendChild(btn);
    document.body.appendChild(parent);

    
    let names = [];
    for(let j = 0; j < clips.length; j++) {
        names.push("player" + j)
    }
    for(let i = 0; i < clips.length; i++) {
        var options = {
            width: 970,
            height: 540,
            autoplay: false,
            time: `${ clips[i].value.timestampInSeconds }`,
            video: `${ clips[i].value.vod._id }`,
            parent: ["clipd.herokuapp.com"]
        };
        names[i] = new Twitch.Player(`${ i }`, options);
        names[i].setVolume(0.5);
        document.querySelectorAll(".close").forEach(b => {
            b.addEventListener('click', () => {
                names[i].pause();
            })
        })

    }

    document.querySelectorAll('.videoBox').forEach(item => {
        const frm = item.querySelector('.modal');
        const btn = document.querySelector('.close');
        item.addEventListener('click', e => {
            frm.style.display = "flex";
            btn.style.display = "block";
        })
    })

    document.querySelectorAll('.close').forEach(x => {
        x.addEventListener('click', e => {
            document.querySelectorAll('.modal').forEach(frm => {
                frm.style.display = "none";
                x.style.display = "none";
            })
        })
    })

    button.onclick = function() {
        window.location = '/';
    }
}