const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject("Failed to load image: " + url);

    img.src = url;
  });
}

function downloadImages() {
  output.innerHTML = "";
  errorDiv.innerText = "";

  loading.style.display = "block";

  Promise.all(images.map(img => downloadImage(img.url)))
    .then(imgElements => {
      loading.style.display = "none";

      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loading.style.display = "none";
      errorDiv.innerText = err;
    });
}

window.onload = () => {
  const btn = document.getElementById("download-images-button");
  btn.addEventListener("click", downloadImages);
};
