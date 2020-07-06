/*
 	* Start Game
*/
const intro = document.getElementById("intro");
const startButton = document.getElementById("startBtn");
const restartButton = document.getElementById("restartBtn");
const gameContainer = document.getElementById("game");
let score = 0;
let currentScore = document.getElementById("currentScore");
let gameActive = false;
const enemies = document.querySelectorAll(".enemy");

const animateEnemy = enemy => enemy.style.animation = "enemy-scroll 3s infinite linear";

const startGame = () => {
	gameActive = true;
	enemies.forEach((enemy, index) => {
		animateEnemy(enemy)
		if (index % 2 !== 0) {
			enemy.style.animationDelay = "2s";
		}
	});
}	

startButton.addEventListener("click", () => startGame());
restartButton.addEventListener("click", () => {
	startGame();
	restartButton.classList.value = "hidden";
});

/*
	* Jump
*/
const character = document.querySelector(".pikachu");
const isJumping = () => character.classList.value.includes("jumping");
const jump = () => {
	if (!isJumping()) {
		character.classList.add("jumping");
		setTimeout(() => character.classList.remove("jumping"), 750);
	}
};
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
		const overlap = (a, b) => !(
			a.right < b.left || 
			a.left > b.right || 
			a.bottom < b.top || 
			a.top > b.bottom
		);
		enemies.forEach(enemy => {
			const enemyEdges = enemy.getBoundingClientRect();
		
			if (overlap(characterEdges, enemyEdges)) {
				console.log("game over");
				enemy.style.animation = "none";
				restartButton.classList.value = "";
				gameActive = false;
			}
			if (enemyEdges.left <= 26) {
				score += 1
				currentScore.innerHTML = `Score: ${score}`;
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