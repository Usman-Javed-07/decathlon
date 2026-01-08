const links = document.querySelectorAll(".links ul li a");

links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

const menuItems = document.querySelectorAll(".menu-item");
let closeTimeout;

function isMobile() {
  return window.innerWidth <= 768;
}

menuItems.forEach((menuItem) => {
  const megaMenu = menuItem.querySelector(".mega-menu");

  menuItem.addEventListener("mouseenter", () => {
    if (!isMobile()) {
      clearTimeout(closeTimeout);
      megaMenu.style.display = "block";
    }
  });

  menuItem.addEventListener("mouseleave", () => {
    if (!isMobile()) {
      closeTimeout = setTimeout(() => {
        megaMenu.style.display = "none";
      }, 200);
    }
  });

  megaMenu.addEventListener("mouseenter", () => {
    if (!isMobile()) {
      clearTimeout(closeTimeout);
      megaMenu.style.display = "block";
    }
  });

  megaMenu.addEventListener("mouseleave", () => {
    if (!isMobile()) {
      closeTimeout = setTimeout(() => {
        megaMenu.style.display = "none";
      }, 200);
    }
  });

  menuItem.addEventListener("click", (e) => {
    if (isMobile()) {
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll(".mega-menu").forEach((menu) => {
        menu.classList.remove("active");
      });
      megaMenu.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");
menuToggle.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

const closeSidebar = () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
};

const closeAll = () => {
  sidebar.classList.remove("active");
  document.querySelectorAll(".mega-menu").forEach((menu) => {
    menu.classList.remove("active");
  });
  overlay.classList.remove("active");
  document.body.style.overflow = "";
};

closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeAll);
const sidebarLinks = document.querySelectorAll(
  ".sidebar-nav a, .sidebar-categories a"
);
sidebarLinks.forEach((link) => {
  link.addEventListener("click", closeSidebar);
});

const megaMenuCloseButtons = document.querySelectorAll(".mega-menu-close");
megaMenuCloseButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeAll();
  });
});
const megaMenuLinks = document.querySelectorAll(".mega-menu .col a");
megaMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (isMobile()) {
      closeAll();
    }
  });
});
