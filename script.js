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
const enemy = document.querySelectorAll(".enemy")[0];


const startGame = () => {
	if (gameContainer.classList.value.includes("hidden")) {
		gameContainer.classList.remove("hidden");
		intro.classList.add("hidden");
		gameActive = true;
		enemy.style.animation = "enemy-scroll 3s infinite linear";
	}		
}
startButton.addEventListener("click", () => {
	startGame();
});
restartButton.addEventListener("click", () => {
	startGame();
	enemy.style.animation = "enemy-scroll 3s infinite linear";
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
		const enemyEdges = enemy.getBoundingClientRect();
		const overlap = (a, b) => !(
			a.right < b.left || 
			a.left > b.right || 
			a.bottom < b.top || 
			a.top > b.bottom
		);
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
	}
}, 10);


/*
	* Generate Clouds
*/
const singleCloudImgPath = "https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/CloudSingle.gif"
const doubleCloudImgPath = "https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/CloudDouble.gif"

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