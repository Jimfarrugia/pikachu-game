const intro = document.getElementById("intro");
const background = document.getElementById("background");
const startButton = document.getElementById("startBtn");
// const volumeButton = document.getElementById("volumeBtn");
const gameContainer = document.getElementById("game");
const character = document.querySelector(".pikachu");
const scoreDisplay = document.getElementById("currentScore");
const recordDisplay = document.getElementById("currentRecord");
const scoreboard = { score: 0, record: 0 };
let gameActive = false;
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

const createDiglet = () => {
	let enemy = document.createElement("div");
	enemy.classList = "enemy enemy-running";
	let diglet = document.createElement("div");
	diglet.className = "diglet";
	enemy.appendChild(diglet);
	background.appendChild(enemy);
}

const createPidgey = () => {
	let enemy = document.createElement("div");
	enemy.classList = "enemy enemy-flying";
	let pidgey = document.createElement("div");
	pidgey.className = "pidgey";
	enemy.appendChild(pidgey);
	background.appendChild(enemy);
}

const updateScore = n => { 
	scoreboard.score = n; 
	scoreDisplay.innerHTML = `${scoreboard.score}`;
};

const updateRecord = n => {
	scoreboard.record = n;
	recordDisplay.innerHTML = `${scoreboard.record}`;
};

const isOverlapping = (a, b) => !(
	a.right < b.left ||
	a.left > b.right ||
	a.bottom < b.top ||
	a.top > b.bottom
);

const startGame = () => {
	startButton.classList.add("hidden")
	gameActive = true;
	jumpSound.play();
	createDiglet();
	createPidgey();
};

const endGame = () => {
	deathSound.play();
	const enemies = document.querySelectorAll(".enemy");
	enemies.forEach(enemy => enemy.remove());
	updateScore(0);
	startButton.classList.remove("hidden");
	gameActive = false;
}

const jump = () => {
	if (!character.classList.value.includes("jumping")) {
		jumpSound.play();
		character.classList.add("jumping");
		setTimeout(() => character.classList.remove("jumping"), 750);
	}
};

// JUMP ON CLICK/KEYPRESS
// keycodes: 32 = spacebar, 38 = up-arrow
gameContainer.addEventListener("click", () => jump());
document.body.onkeyup = e => (e.keyCode === 32 || e.keyCode === 38) ? jump() : null;
document.body.ontouchstart = () => jump();

startButton.addEventListener("click", () => startGame());
// volumeButton.addEventListener("click", () => toggleVolume(volume));

// * Check for death
const checkDead = setInterval(function() {
	if (gameActive) {
		const enemies = document.querySelectorAll(".enemy");
		const characterEdges = character.getBoundingClientRect();
		const backgroundEdges = background.getBoundingClientRect();
		enemies.forEach(enemy => {
			const enemyEdges = enemy.getBoundingClientRect();
			if (isOverlapping(characterEdges, enemyEdges)) {
				endGame();
			}
			// ! Problems respawning pidgey...  also doesn't count score on pidgey
			if (!isOverlapping(backgroundEdges, enemyEdges)) {
				enemy.className === "enemy enemy-flying" ? createPidgey() : createDiglet();
				updateScore(scoreboard.score + 1);
				if (scoreboard.score > scoreboard.record) updateRecord(scoreboard.score);
				enemy.remove();
			}
		});
	}
}, 10);

// * Clouds
const singleCloudImgPath = "img/cloud-single.gif"
const doubleCloudImgPath = "img/cloud-double.gif"

const clouds = document.getElementById("clouds");

const singleCloud = document.createElement("img");
singleCloud.classList = "cloud cloud-small";
singleCloud.src = singleCloudImgPath;

const doubleCloud = document.createElement("img");
doubleCloud.classList = "cloud cloud-large";
doubleCloud.src = doubleCloudImgPath;

const numOfClouds = 5;
for (let i = 0; i < numOfClouds; i++) {
	(i % 2 === 0)
	? clouds.innerHTML += doubleCloud.outerHTML
	: clouds.innerHTML += singleCloud.outerHTML;
}

// * Snowflakes
const snowflakes = document.getElementById("snowflakes");

const snowflake = document.createElement("div");
snowflake.className = "snowflake";
snowflake.appendChild(document.createTextNode("❅"));

const numOfSnowflakes = 10;
for (let i = 0; i < numOfSnowflakes; i++) {
	snowflakes.innerHTML += snowflake.outerHTML;
}