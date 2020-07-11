// const volumeButton = document.getElementById("volumeBtn");
// let volume = false;

function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){ this.sound.play(); }
  this.pause = function(){ this.sound.pause(); }
  this.stop = function(){
		this.sound.pause();
		this.sound.currentTime = 0;
	}
}

const jumpSound = new Sound("audio/jump.mp3");

const deathSound = new Sound("audio/death.mp3");

// const music = new Sound("audio/route-1.mp3");

// const toggleVolume = volume => {
// 	if (volume) {
// 		volume = false;
// 		music.stop();
// 	} else {
// 		volume = true;
// 		music.play();
// 	}
// }

export { jumpSound, deathSound };