import { timeGreaterThan, timeGreaterThan2, timestamp, timestamp2 } from './search_utilities';

export const displayStreams = (events, videos, gtag) => {
    const splash = document.getElementsByClassName("splash-content")[0];
    splash.style.display = "none";
    
    let clips = [];
    debugger
    for(let j = 0; j < videos.length; j++) {
        // debugger
        for(let i = 0; i < events.length; i++) {
            // debugger
            if(timeGreaterThan(events[i]._D, videos[j].created_at) && timeGreaterThan2(events[i]._D, videos[j].created_at, videos[j].length)) {
                // debugger
                clips.push({"url": videos[j].url, "seek": timestamp2(events[i]._D, videos[j].created_at, videos[j].length), "timestampInSeconds": timestamp(events[i]._D, videos[j].created_at, videos[j].length), "event": events[i], "vod": videos[j]})
            }
        }
    }

    const parent = document.createElement("section")
    const button = document.createElement("span");
    button.innerHTML = '&larr;';
    button.classList.add("back");
    parent.appendChild(button);
    const container = document.createElement("section");
    parent.classList.add("parent-container");
    const player = document.createElement("div");
    player.innerHTML = `<h2>${ gtag }</h2>`;
    container.appendChild(player);
    
    const listOfVids = document.createElement("ul");
    listOfVids.classList.add("list-of-vids");
    for(let i = 0; i < videos.length; i++) {
        const ul = document.createElement("ul");
        ul.innerHTML = `<h3>${ clips[i].vod.title }</h3><span>${ clips[i].vod.created_at }</span>`;
        ul.classList.add("streamsBox");
        const modal = document.createElement("section");
        modal.classList.add("modal2");
        const modal_content = document.createElement("div");
        modal_content.classList.add("modal-content");

        // const ifrm = document.createElement("script");
        // ifrm.setAttribute("src", "https://player.twitch.tv/js/embed/v1.js");
        const div = document.createElement("div");
        div.setAttribute("id", "2");
        const ifrm2 = document.createElement("script");
        ifrm2.setAttribute("type", "text/javascript");
        const a = () => {
            var options = {
                width: 970,
                height: 540,
                video: "v769618078"
            };
            var player = new Twitch.Player("2", options);
            player.setVolume(0.5);
            document.querySelectorAll('.nostylist').forEach(event => {
                event.addEventListener('click', () => {
                    player.seek(Number(event.id));
                })
            })
        }
        ifrm2.innerHTML = a;
        // modal_content.appendChild(ifrm);
        modal_content.appendChild(div);
        modal_content.appendChild(ifrm2);

        for(let j = 0; j < clips.length; j++) {
            const li = document.createElement("li");
            // debugger
            li.innerHTML = `Killer:${ clips[j].event.killer ? (clips[j].event.killer.name) : "Environment" } Victim:${ clips[j].event.victim.name }`;
            li.classList.add(`${ clips[j].event.killer ? (clips[j].event.killer.name === gtag ? "gr" : "re") : "re" }`, "nostylist");
            li.setAttribute("id", `${ clips[j].seek }`)
            modal_content.appendChild(li);
        }
        modal.appendChild(modal_content);
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

    document.querySelectorAll('.streamsBox').forEach(item => {
        const frm = item.querySelector('.modal2');
        const btn = document.querySelector('.close');
        item.addEventListener('click', e => {
            frm.style.display = "flex";
            btn.style.display = "block";
        })
    })

    document.querySelectorAll('.close').forEach(x => {
        x.addEventListener('click', e => {
            document.querySelectorAll('.modal2').forEach(frm => {
                frm.style.display = "none";
                x.style.display = "none";
            })
        })
    })

    button.onclick = function() {
        splash.style.display = "flex";
        parent.style.display = "none";
    }
}