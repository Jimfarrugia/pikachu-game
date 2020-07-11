import generateSnowflakes from "./modules/snowflakes.js";
import generateClouds from "./modules/clouds.js";
import { jumpSound, deathSound } from "./modules/sound.js";

const gameContainer = document.getElementById("game");
const background = document.getElementById("background");
const startButton = document.getElementById("startBtn");
const character = document.querySelector(".pikachu");
const scoreDisplay = document.getElementById("currentScore");
const recordDisplay = document.getElementById("currentRecord");

const scoreboard = { score: 0, record: 0 };
let gameActive = false;

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


generateClouds("clouds");
generateSnowflakes("snowflakes");