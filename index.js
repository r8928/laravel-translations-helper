getCB = () => navigator.clipboard.readText();

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      getCB().then((clipText) => {
        document.querySelector("h1").innerText = `copied ${clipText}`;
        setTimeout(() => {
          document.querySelector("h1").innerHTML = "&nbsp;";
        }, 1000);
      });
    },
    (err) => {}
  );
}

$("p").on("click", function () {
  console.log($(this).text());
  copyTextToClipboard($(this).text());
});

function translatee() {
  getCB().then((string) => {
    fetch("translate.php?string=" + encodeURIComponent(string))
      .then((response) => response.text())
      .then((res) => {
        copyTextToClipboard(" \n" + res.trim());
      });
  });
}
