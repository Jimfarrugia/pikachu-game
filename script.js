
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

document.body.onkeyup = e => {
	if (e.keyCode === 32 || e.code === 'Space') jump();
};

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