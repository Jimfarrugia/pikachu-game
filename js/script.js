import generateSnowflakes from "./modules/snowflakes.js";
import generateClouds from "./modules/clouds.js";
import { jumpSound, deathSound } from "./modules/sound.js";
import { isOverlapping, removeAllEnemies } from "./modules/helpers.js";
import { updateScore, updateRecord } from "./modules/scoreboard.js";
import { createDiglet, createPidgey } from "./modules/enemy.js";

const background = document.getElementById("background");
const startButton = document.getElementById("startBtn");
const character = document.querySelector(".pikachu");

const scoreboard = { score: 0, record: 0 };
let gameActive = false;

const startGame = () => {
	removeAllEnemies();
	startButton.classList.add("hidden")
	gameActive = true;
	jumpSound.play();
	createDiglet();
	createPidgey();
};

const endGame = () => {
	console.log('game ended')
	removeAllEnemies();
	deathSound.play();
	updateScore(0, scoreboard);
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
document.getElementById("game").addEventListener("click", () => jump());
document.body.onkeyup = e => (e.keyCode === 32 || e.keyCode === 38) ? jump() : null;
document.body.ontouchstart = () => jump();

startButton.addEventListener("click", () => startGame());

// * Check for death
const checkDead = setInterval(() => {
	if (gameActive) {
		const { score, record } = scoreboard;
		const characterEdges = character.getBoundingClientRect();
		const backgroundEdges = background.getBoundingClientRect();
		document.querySelectorAll(".enemy").forEach(enemy => {
			const enemyEdges = enemy.getBoundingClientRect();
			if (isOverlapping(characterEdges, enemyEdges)) endGame();
			console.log('running');
			// Score pidgey
			if (enemy.classList.value.includes("enemy-flying") && enemyEdges.left < 125) {
				console.log('new pidgey');
				createPidgey();
				updateScore(score+1, scoreboard);
				if (score > record) updateRecord(score, scoreboard);
				enemy.remove();
			};
			// Score diglet
			if (!isOverlapping(backgroundEdges, enemyEdges)) {
				console.log('new diglet');
				createDiglet();
				updateScore(score+1, scoreboard);
				if (score > record) updateRecord(score, scoreboard);
				enemy.remove();
			}
		});
	}
}, 10);

generateClouds(5);
generateSnowflakes(10);