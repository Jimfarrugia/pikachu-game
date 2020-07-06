const intro = document.getElementById("intro");
const startButton = document.getElementById("startBtn");
const gameContainer = document.getElementById("game");
const character = document.querySelector(".pikachu");
const enemies = document.querySelectorAll(".enemy");
let gameActive = false;
let score = 0;
let record = 0;
let currentScore = document.getElementById("currentScore");
let currentRecord = document.getElementById("currentRecord");

const isJumping = () => character.classList.value.includes("jumping");

const hideElement = element => element.classList.add("hidden");

const unhideElement = element => element.classList.remove("hidden");

const overlap = (a, b) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);

const animateEnemies = enemies => 
	enemies.forEach((enemy, index) => {
		enemy.style.animation = "enemy-scroll 3s infinite linear";
		if (index % 2 !== 0) enemy.style.animationDelay = "2s";
	});

const removeEnemies = enemies =>
	enemies.forEach(enemy => enemy.style.animation = "none");

const startGame = () => {
	hideElement(startButton);
	gameActive = true;
	animateEnemies(enemies);
};

const updateScore = score => currentScore.innerHTML = `Score: ${score}`;

const updateRecord = record => currentRecord.innerHTML = `Record: ${record}`;

startButton.addEventListener("click", () => startGame());

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

/*
	* Check for death
*/
const checkDead = setInterval(function() {
	if (gameActive) {
		const characterEdges = character.getBoundingClientRect();
		
		enemies.forEach(enemy => {
			const enemyEdges = enemy.getBoundingClientRect();
			if (overlap(characterEdges, enemyEdges)) {
				score = 0;
				updateScore(score);
				removeEnemies(enemies);
				unhideElement(startButton)
				gameActive = false;
			}
			// Count a score
			if (enemyEdges.left <= 26) {
				score += 1;
				updateScore(score);
				if (score > record) {
					record = score;
					updateRecord(record);
				};
			}
		});
	}
}, 10);

/*
	* Generate Clouds
*/
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

/*
	* Generate Snowflakes
*/
const snowflakes = document.getElementById("snowflakes");

// Create a snowflake
const snowflake = document.createElement("div");
snowflake.className = "snowflake";
snowflake.appendChild(document.createTextNode("❅"));

// Add snowflakes
const numOfSnowflakes = 10;
for (let i = 0; i < numOfSnowflakes; i++) {
	snowflakes.innerHTML += snowflake.outerHTML;
}