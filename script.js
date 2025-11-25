const imageUrls = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/301",
  "https://invalid-url.com/image.jpg", // test failure
  "https://picsum.photos/200/302"
];

const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

// Function to load a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);

    img.src = url;
  });
}

// Main function
async function downloadImages() {
  output.innerHTML = "";
  errorDiv.innerText = "";
  loading.style.display = "block";

  try {
    const images = await Promise.all(imageUrls.map(downloadImage));

    loading.style.display = "none";

    images.forEach(img => output.appendChild(img));

  } catch (err) {
    loading.style.display = "none";
    errorDiv.innerText = err;
  }
}

// Call function
downloadImages();
