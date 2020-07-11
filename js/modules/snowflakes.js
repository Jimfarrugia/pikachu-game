export default function generateSnowflakes(numberOfSnowflakes) {
	const snowflakes = document.getElementById("snowflakes");
	const snowflake = document.createElement("div");
	snowflake.className = "snowflake";
	snowflake.appendChild(document.createTextNode("❅"));

	for (let i = 0; i < numberOfSnowflakes; i++) {
		snowflakes.innerHTML += snowflake.outerHTML;
	}
}