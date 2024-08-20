let currentSong = new Audio();

async function getSong() {
    // this is a method where we can use local server as my laptop
    let a = await fetch("http://127.0.0.1:3000/spotify_clone_attempt_2/Romantic%20songs/")
    let response = await a.text();
    console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = [];
    for (let index = 0; index < as.length; index++) {       //go 2nd for loop and press it -> ctr+tab
        const element = as[index];


        if (element.href.endsWith(".mp3")) {
            console.log(element.href.match(/(?<=Song-).*(?=.mp3)/)[0])
            songs.push(element.href.split("/song/")[0])

        }
    }

    songs.map((eli) => {
        console.log(eli)
    })


    return songs
}


const playMusic = (track) => {

    currentSong.src = track;
    currentSong.play();
    play_btn_playbar.src = "pause.svg"
}

async function main() {

    let songs = await getSong();

    console.log("ypp")

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {

        songUL.innerHTML = songUL.innerHTML + `<li>
                    <img class="music_icon invert"  rounded" src="music_icon.svg" alt="music_icon"> 
                    <div  class="info"> <div id=${song}> ${song.match(/(?<=Song-).*(?=.mp3)/)[0]} </div>
                    </div>
                    <img  class="music_play_songList_btn invert rounded" src="play.svg" alt="play button">
                  
                </li>`;
    }

    // Attach eventlistner to the song

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            console.log(e.querySelector(".info").firstElementChild.id)
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.id)
        })
    })


    play_btn_playbar.addEventListener("click", () => {
        if (currentSong.paused) {                   
            currentSong.play();
            play_btn_playbar.src = "pause.svg";
            document.querySelector(".songinfo").innerHTML = track
            document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
        }
        else {
            currentSong.pause()
            play_btn_playbar.src = "play.svg"
        }
    })

}
main();

