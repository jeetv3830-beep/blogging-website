const themeBtn = document.getElementById("theme-btn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️ Light";
}

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "☀️ Light";
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌙 Dark";
  }
});
