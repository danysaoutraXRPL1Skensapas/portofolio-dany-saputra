(function () {
  const t = localStorage.getItem("theme") || "light"; 
  document.documentElement.setAttribute("data-theme", t);
})();

document.addEventListener("DOMContentLoaded", () => {
  const togle = document.getElementById("togleTheme");
  
  if (togle) {
    const initialTheme = document.documentElement.getAttribute("data-theme");
    togle.innerText = initialTheme === "light" ? "dark" : "light";
    
    togle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      
      if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        togle.innerText = "dark";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        togle.innerText = "light";
      }
    });
  }
});