const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});
