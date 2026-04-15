console.log("Welcome to Spotify");
let songIndex=0;
let AudioElement=new Audio("songs/1.mp3.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItem=Array.from(document.getElementsByClassName("songItem"))

let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "We Rollin", filepath:"songs/1.mp3.mp3", coverPath:"cover/0.jpg"},
    {songName: "  Supreme", filepath:"songs/2.mp3.mp3", coverPath:"cover/1.jpg"},
    {songName: "     Aura", filepath:"songs/3.mp3.mp3", coverPath:"cover/2.jpg"},
    {songName: "  Balenci", filepath:"songs/4.mp3.mp3", coverPath:"cover/3.jpg"},
    {songName: " One Love", filepath:"songs/5.mp3.mp3", coverPath:"cover/4.jpg"},
    {songName: " Elevated", filepath:"songs/6.mp3.mp3", coverPath:"cover/5.jpg"}
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// handle play/pause music
masterPlay.addEventListener('click',()=>{
    if(AudioElement.paused || AudioElement.currentTime<=0){
        AudioElement.play();
        masterPlay.classList.remove( "fa-play-circle" );
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }else{
        AudioElement.pause();
        masterPlay.classList.remove( "fa-pause-circle" );
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
        
    }
})
// listen to Events
AudioElement.addEventListener('timeupdate',()=>{

    // update seekbar
    progress=parseInt((AudioElement.currentTime/AudioElement.duration)*100);

    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    AudioElement.currentTime=myProgressBar.value*AudioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
         element.classList.add("fa-play-circle")

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        AudioElement.src=`songs/${songIndex}.mp3.mp3`;
        masterSongName.innerText=songs[songIndex-1].songName;
        AudioElement.currentTime=0;
        AudioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove( "fa-play-circle" );
        masterPlay.classList.add("fa-pause-circle");
    
    })
})


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex=0;
    }else{
        songIndex+=1;
    }
         AudioElement.src=`songs/${songIndex+1}.mp3.mp3`;
         masterSongName.innerText=songs[songIndex].songName;
        AudioElement.currentTime=0;
        AudioElement.play();
        masterPlay.classList.remove( "fa-play-circle" );
        masterPlay.classList.add("fa-pause-circle");
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=5;
    }else{
        songIndex-=1;
    }
         AudioElement.src=`songs/${songIndex-1}.mp3.mp3`;
         masterSongName.innerText=songs[songIndex].songName
        AudioElement.currentTime=0;
        AudioElement.play();
        masterPlay.classList.remove( "fa-play-circle" );
        masterPlay.classList.add("fa-pause-circle");
})
