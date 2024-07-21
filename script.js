console.log('lets write java script')

async function getSong() {
    // this is a method where we can use local server as my laptop
    let a = await fetch("http://127.0.0.1:3000/spotify_clone_attempt_2/Romantic%20songs/")
    let response = await a.text();
    console.log(response)          // used to check response provided by browser and of local files of 
    // songs and give them in form of <a> tag and href inside tabular form
    // in <td> and <th> manner

    // let div= document.createElement("div")
    // div.innerHTML= response;
    // let tds= div.getElementsByTagName("td")
    // console.log(tds);                //tds se problem ye hogi ki sare tds mil jayege then use <a>
    
  // **** function for conversion of song name ,artist name ****

  
  
  
  let div = document.createElement("div")
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")
  let songs = [];
  for (let index = 0; index < as.length; index++) {       //go 2nd for loop and press it -> ctr+tab
    const element = as[index];
    if (element.href.endsWith(".mp3")) {                  // only for songs
        songs.push(element.href)
        
        }
    }
    // console.log(songs)                => for checking songs comes in browser or not
    return songs
}

// let songs= getSong()         => this method is not used because after using this method the promise 
// console.log(songs);             shows as pending because async function is returnig songs       
//                                 therefore for avoiding this situation we have to use another
//                                 async function and parse the function(getSongs) into it
//                                 as shown below

async function main() {
    //get the list of all the songs

    let songs = await getSong();
    console.log(songs);

    let songUL= document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        //  songUL.innerHTML = songUL.innerHTML + song;    => appends songs url in <ul> tag

         songUL.innerHTML = songUL.innerHTML + `<li> ${song.} </li>`;        
    }

    //Play the first song
    var audio = new Audio(songs[0]);
// ***  // // audio.play();                                              
                                    // jab tak user interact nahi karta tab tak ye error ayega aur song 
                                    // play hoga
                                    // error name on browser
    // script.js:44  Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
    //  [NEW] Explain Console errors by using Copilot in Edge: click 
    //   to explain an error. Learn more

    // play audio => aur yadi paly karna ho to js file se interact kar lo tab dabakar
    // stop audio => rokna ho tho browser ko refresh kar lo ruk layega
    
    audio.addEventListener("loadeddata",()=>{
        console.log(audio.duration,audio.currentSrc,audio.currentTime)
    });
}

main()                             //all songs are shown here as array                 