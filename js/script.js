(async () => {
  const file = window.location.hash.substr(1) || "homepage";

  fetch(`./content/${file}.html`)
    .then((data) => data.text())
    .then((content) => {
      document.getElementById("main-content").innerHTML = content;
    });
})();
