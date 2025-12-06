const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Load theme from localStorage if available
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    body.classList.add("light");
    toggleBtn.textContent = "Dark Mode";
} else {
    toggleBtn.textContent = "Light Mode";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        toggleBtn.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
    } else {
        toggleBtn.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    }
});
