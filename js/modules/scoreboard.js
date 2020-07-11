const updateScore = (n, scoreboard) => { 
	const scoreDisplay = document.getElementById("currentScore");
	scoreboard.score = n; 
	scoreDisplay.innerHTML = `${scoreboard.score}`;
}

const updateRecord = (n, scoreboard) => {
	const recordDisplay = document.getElementById("currentRecord");
	scoreboard.record = n;
	recordDisplay.innerHTML = `${scoreboard.record}`;
}

export { updateScore, updateRecord };