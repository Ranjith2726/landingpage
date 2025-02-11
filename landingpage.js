// script.js
// Function to change navbar color based on the section in view
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll(".section");

const options = {
  threshold: 0.5, // Trigger when 50% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const color = entry.target.getAttribute("data-color");
      navbar.style.backgroundColor = color;
    }
  });
}, options);

// Observe each section
sections.forEach((section) => {
  observer.observe(section);
});

// Toggle mobile menu
const navLinks = document.querySelector(".nav-links");
const toggleButton = document.createElement("div");
toggleButton.classList.add("toggle-button");
toggleButton.innerHTML = "&#9776;"; // Hamburger icon
document.getElementById("navbar").appendChild(toggleButton);

toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when a link is clicked
navLinks.addEventListener("click", () => {
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
});
