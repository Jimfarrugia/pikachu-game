export default function generateSnowflakes(containerId) {
	const snowflakes = document.getElementById(containerId);
	const snowflake = document.createElement("div");
	snowflake.className = "snowflake";
	snowflake.appendChild(document.createTextNode("❅"));

	const numOfSnowflakes = 10;
	for (let i = 0; i < numOfSnowflakes; i++) {
		snowflakes.innerHTML += snowflake.outerHTML;
	}
}