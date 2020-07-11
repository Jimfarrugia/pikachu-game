export default function generateClouds(containerId) {
	const singleCloudImgPath = "img/cloud-single.gif"
	const doubleCloudImgPath = "img/cloud-double.gif"

	const clouds = document.getElementById(containerId);

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
}