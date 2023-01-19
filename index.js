getCB = () => navigator.clipboard.readText();

$("#surround_with").val(localStorage.getItem("surround_with"));

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      getCB().then((clipText) => {
        document.querySelector("h1").innerHTML = `copied ${clipText}`;
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

$("#surround_with").on("change", function () {
  localStorage.setItem("surround_with", $(this).val());
});

function translatee() {
  const sourcelang =
    document.querySelector("[name=source]:checked").value || "ar";
  console.log(`🚀 > translatee > sourcelang`, sourcelang);
  const surround_with = document.getElementById("surround_with").value;
  getCB().then((string) => {
    fetch(
      `translate.php?sourcelang=${sourcelang}&string=${encodeURIComponent(
        string
      )}&surround_with=${surround_with}`
    )
      .then((response) => response.json())
      .then((res) => {
        copyTextToClipboard(" \n" + res.translation);

        document.querySelector(".surround_with").innerText =
          res.surround_with || "";
      });
  });
}
