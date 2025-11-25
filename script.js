
window.addEventListener("DOMContentLoaded", () => {

  const output = document.getElementById("output");
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const btn = document.getElementById("download-images-button");

  const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
  ];

  function downloadImage(img) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = img.url;

      image.onload = () => resolve(image);
      image.onerror = () => reject("Failed to load image: " + img.url);
    });
  }

  async function downloadImages() {
    output.innerHTML = "";
    errorDiv.innerText = "";
    loading.style.display = "block";

    try {
      const allImages = await Promise.all(images.map(downloadImage));

      loading.style.display = "none";

      allImages.forEach(img => {
        output.appendChild(img);
      });

    } catch (err) {
      loading.style.display = "none";
      errorDiv.innerText = err;
    }
  }

  // ✅ THIS was causing the crash earlier
  btn.addEventListener("click", downloadImages);

});
