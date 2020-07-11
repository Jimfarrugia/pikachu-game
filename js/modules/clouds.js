export default function generateClouds(numberOfClouds) {
	const singleCloudImgPath = "img/cloud-single.gif"
	const doubleCloudImgPath = "img/cloud-double.gif"

	const clouds = document.getElementById("clouds");

	const singleCloud = document.createElement("img");
	singleCloud.classList = "cloud cloud-small";
	singleCloud.src = singleCloudImgPath;

	const doubleCloud = document.createElement("img");
	doubleCloud.classList = "cloud cloud-large";
	doubleCloud.src = doubleCloudImgPath;

	for (let i = 0; i < numberOfClouds; i++) {
		(i % 2 === 0)
		? clouds.innerHTML += doubleCloud.outerHTML
		: clouds.innerHTML += singleCloud.outerHTML;
	}
}