import dateConverter from './date_converter';
import { timeGreaterThan, timeGreaterThan2, timestamp, timestamp2 } from './search_utilities';

export const displayStreams = (events, videos, gtag) => {
    const splash = document.getElementsByClassName("splash-content")[0];
    splash.style.display = "none";
    const logo = document.getElementsByClassName("logo")[0];
    logo.style.display = "none";
    const fp = document.getElementsByClassName("load")[0];
    fp.style.display = "none";
    
    let clips = [];
    let videoHasEvents = {};

    // debugger
    for(let j = 0; j < videos.length; j++) {
        for(let i = 0; i < events.length; i++) {
            if(timeGreaterThan(events[i]._D, videos[j].created_at) && timeGreaterThan2(events[i]._D, videos[j].created_at, videos[j].length)) {
                videoHasEvents[videos[j]._id] = true;
                clips.push({"video_id": videos[j]._id, "url": videos[j].url, "seek": timestamp2(events[i]._D, videos[j].created_at, videos[j].length), "timestampInSeconds": timestamp(events[i]._D, videos[j].created_at, videos[j].length), "event": events[i], "vod": videos[j]})
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
    const plyr = document.createElement("div");
    plyr.innerHTML = `<h2>${ gtag }</h2>`;
    container.appendChild(plyr);
    
    const listOfVids = document.createElement("ul");
    listOfVids.classList.add("list-of-vids");
    for(let i = 0; i < videos.length; i++) {
        if(videoHasEvents[videos[i]._id]) {
            const ul = document.createElement("ul");
            ul.innerHTML = `<h3>${ videos[i].title }</h3><span>${ dateConverter(videos[i].created_at) }</span>`;
            ul.classList.add("streamsBox");
            const modal = document.createElement("section");
            modal.classList.add("modal2");
            const modal_content = document.createElement("div");
            modal_content.classList.add("modal-content");

            for(let j = 0; j < clips.length; j++) {
                if(clips[j].video_id === videos[i]._id) {
                    const li = document.createElement("li");
                    // debugger
                    li.innerHTML = `Killer:${ clips[j].event.killer ? (clips[j].event.killer.name) : "Environment" } Victim:${ clips[j].event.victim.name }`;
                    li.classList.add(`${ clips[j].event.killer ? (clips[j].event.killer.name === gtag ? "gr" : "re") : "re" }`, "nostylist");
                    li.setAttribute("id", `${ clips[j].seek }`)
                    modal_content.appendChild(li);
                }
            }
            modal.appendChild(modal_content);

            const div = document.createElement("div");
            div.setAttribute("id", `${ i }`);
            div.classList.add("vframe");
            modal.appendChild(div);

            ul.appendChild(modal);
            listOfVids.appendChild(ul);
        }
    }


    const btn = document.createElement("span");
    btn.innerHTML = '&#10006;';
    btn.classList.add("close2");
    container.appendChild(listOfVids)
    parent.appendChild(container);
    parent.appendChild(btn);
    document.body.appendChild(parent);

    let names = [];
    for(let j = 0; j < videos.length; j++) {
        names.push("player" + j)
    }
    for(let i = 0; i < videos.length; i++) {
        if(videoHasEvents[videos[i]._id]) {
            var options = {
                width: 970,
                height: 540,
                autoplay: false,
                video: `${ videos[i]._id }`
            };
            names[i] = new Twitch.Player(`${ i }`, options);
            names[i].setVolume(0.5);
            document.querySelectorAll('.nostylist').forEach(event => {
                event.addEventListener('click', () => {
                    names[i].seek(Number(event.id));
                })
            })
            document.querySelectorAll(".close2").forEach(b => {
                b.addEventListener('click', () => {
                    names[i].pause();
                })
            })
        }
    }

    document.querySelectorAll('.streamsBox').forEach(item => {
        const frm = item.querySelector('.modal2');
        const btn = document.querySelector('.close2');
        item.addEventListener('click', e => {
            frm.style.display = "flex";
            btn.style.display = "block";
        })
    })

    document.querySelectorAll('.close2').forEach(x => {
        x.addEventListener('click', e => {
            document.querySelectorAll('.modal2').forEach(frm => {
                frm.style.display = "none";
                x.style.display = "none";
            })
        })
    })

    button.onclick = function() {
        window.location = '/';
    }
}