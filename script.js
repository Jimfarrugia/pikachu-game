const intro = document.getElementById("intro");
const background = document.getElementById("background");
const startButton = document.getElementById("startBtn");
const gameContainer = document.getElementById("game");
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

const updateScore = n => { scoreboard.score = n; scoreDisplay.innerHTML = `${scoreboard.score}`; };
const updateRecord = n => { scoreboard.record = n; recordDisplay.innerHTML = `${scoreboard.record}`; };

const isJumping = () => character.classList.value.includes("jumping");

const isOverlapping = (a, b) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);

const hideElement = element => element.classList.add("hidden");

const unhideElement = element => element.classList.remove("hidden");

const startGame = () => {
	hideElement(startButton);
	gameActive = true;
	createDiglet();
};

const endGame = () => {
	const enemies = document.querySelectorAll(".enemy");
	enemies.forEach(enemy => enemy.remove());
	updateScore(0);
	unhideElement(startButton);
	gameActive = false;
}

const jump = () => {
	if (!isJumping()) {
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
			if (!isOverlapping(enemyEdges, backgroundEdges)) {
				createDiglet();
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