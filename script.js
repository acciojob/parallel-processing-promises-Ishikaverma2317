const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

async function downloadImages() {
  // safety check for Cypress
  if (!output || !loadingDiv || !errorDiv) return;

  loadingDiv.style.display = "block";
  output.innerHTML = "";
  errorDiv.innerText = "";

  try {
    const imageElements = await Promise.all(
      images.map(img => downloadImage(img.url))
    );

    loadingDiv.style.display = "none";

    imageElements.forEach(img => output.appendChild(img));
  } catch (err) {
    loadingDiv.style.display = "none";
    errorDiv.innerText = err;
  }
}

btn.addEventListener("click", downloadImages);
