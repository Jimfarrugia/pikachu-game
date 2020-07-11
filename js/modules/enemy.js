const createDiglet = () => {
	const background = document.getElementById("background");
	let enemy = document.createElement("div");
	enemy.classList = "enemy enemy-running";
	let diglet = document.createElement("div");
	diglet.className = "diglet";
	enemy.appendChild(diglet);
	background.appendChild(enemy);
}

const createPidgey = () => {
	const background = document.getElementById("background");
	let enemy = document.createElement("div");
	enemy.classList = "enemy enemy-flying";
	let pidgey = document.createElement("div");
	pidgey.className = "pidgey";
	enemy.appendChild(pidgey);
	background.appendChild(enemy);
}

export { createDiglet, createPidgey };