/*
 	* Start game
*/
const intro = document.getElementById("intro");
const startButton = document.getElementById("startBtn");
const gameContainer = document.getElementById("game");
const startGame = () => {
	if (gameContainer.classList.value.includes("hidden")) {
		gameContainer.classList.remove("hidden");
		intro.classList.add("hidden");
	} else {
		console.log("Game is already running...")
	}		
}
startButton.addEventListener("click", () => startGame());

/*
	* PIKACHU JUMP
*/
const character = document.querySelector(".pikachu");
const isJumping = () => character.classList.value.includes("jumping");
const jump = () => {
	if (!isJumping()) {
		character.classList.add("jumping");
		setTimeout(() => character.classList.remove("jumping"), 500);
	}
};
// keycodes: 32 = spacebar, 38 = up-arrow
gameContainer.addEventListener("click", () => jump());
document.body.onkeyup = e => (e.keyCode === 32 || e.keyCode === 38) ? jump() : null;
document.body.ontouchstart = () => jump();

/*
	* CLOUDS
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
	* SNOWFLAKES
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