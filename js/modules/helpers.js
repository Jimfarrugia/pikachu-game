const isOverlapping = (a, b) => !(
	a.right < b.left ||
	a.left > b.right ||
	a.bottom < b.top ||
	a.top > b.bottom
);

const removeAllEnemies = () => document.querySelectorAll(".enemy").forEach(enemy => enemy.remove());

export { isOverlapping, removeAllEnemies };