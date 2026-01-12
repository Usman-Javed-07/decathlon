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

function initShopCarousel() {
  const shopSport = document.querySelector('.shop-sport');
  if (!shopSport) return;

  let animationId;
  let isAutoScrolling = true;
  let scrollSpeed = 1;
  let userInteracting = false;
  let isCloned = false;
  let resetPoint = 0;

  function checkScreenSize() {
    return window.innerWidth <= 1000;
  }

  function cloneContent() {
    if (!checkScreenSize() || isCloned) return;

    const children = Array.from(shopSport.children);

    for (let i = 0; i < 2; i++) {
      children.forEach(child => {
        const clone = child.cloneNode(true);
        shopSport.appendChild(clone);
      });
    }

    isCloned = true;

    setTimeout(() => {
      const originalWidth = children.reduce((sum, child) => sum + child.offsetWidth, 0);
      resetPoint = originalWidth;
    }, 100);
  }

  function removeClonedContent() {
    if (!isCloned) return;
    const originalCount = shopSport.children.length / 3;
    const clonedCount = shopSport.children.length - originalCount;
    for (let i = 0; i < clonedCount; i++) {
      if (shopSport.lastChild) {
        shopSport.removeChild(shopSport.lastChild);
      }
    }
    isCloned = false;
    resetPoint = 0;
  }

  function autoScroll() {
    if (!checkScreenSize()) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      removeClonedContent();
      shopSport.scrollLeft = 0;
      return;
    }

    if (isAutoScrolling && !userInteracting) {
      shopSport.scrollLeft += scrollSpeed;

      if (shopSport.scrollLeft >= resetPoint) {
        shopSport.scrollLeft = 0;
      }
    }

    animationId = requestAnimationFrame(autoScroll);
  }

  shopSport.addEventListener('mouseenter', () => {
    if (checkScreenSize()) {
      userInteracting = true;
      isAutoScrolling = false;
    }
  });

  shopSport.addEventListener('mouseleave', () => {
    if (checkScreenSize()) {
      userInteracting = false;
      isAutoScrolling = true;
    }
  });

  shopSport.addEventListener('touchstart', () => {
    if (checkScreenSize()) {
      userInteracting = true;
      isAutoScrolling = false;
    }
  }, { passive: true });

  shopSport.addEventListener('touchend', () => {
    if (checkScreenSize()) {
      setTimeout(() => {
        userInteracting = false;
        isAutoScrolling = true;
      }, 2000);
    }
  }, { passive: true });

  let scrollTimeout;
  shopSport.addEventListener('scroll', () => {
    if (!checkScreenSize()) return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (!userInteracting) {
        isAutoScrolling = true;
      }
    }, 1500);
  }, { passive: true });

  if (checkScreenSize()) {
    cloneContent();
    autoScroll();
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (checkScreenSize()) {
        cloneContent();
        if (!animationId) {
          autoScroll();
        }
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        removeClonedContent();
        shopSport.scrollLeft = 0;
        isAutoScrolling = true;
        userInteracting = false;
      }
    }, 200);
  });
}

function initCategoriesCarousel() {
  const categoriesItems = document.querySelector('.categories-items');
  if (!categoriesItems) return;

  let animationId;
  let isAutoScrolling = true;
  let scrollSpeed = 0.8;
  let userInteracting = false;
  let isCloned = false;
  let resetPoint = 0;

  function checkScreenSize() {
    return window.innerWidth <= 920;
  }

  function cloneContent() {
    if (!checkScreenSize() || isCloned) return;

    const children = Array.from(categoriesItems.children);

    for (let i = 0; i < 2; i++) {
      children.forEach(child => {
        const clone = child.cloneNode(true);
        categoriesItems.appendChild(clone);
      });
    }

    isCloned = true;

    setTimeout(() => {
      const originalWidth = children.reduce((sum, child) => sum + child.offsetWidth, 0);
      resetPoint = originalWidth;
    }, 100);
  }

  function removeClonedContent() {
    if (!isCloned) return;
    const originalCount = categoriesItems.children.length / 3;
    const clonedCount = categoriesItems.children.length - originalCount;
    for (let i = 0; i < clonedCount; i++) {
      if (categoriesItems.lastChild) {
        categoriesItems.removeChild(categoriesItems.lastChild);
      }
    }
    isCloned = false;
    resetPoint = 0;
  }

  function autoScroll() {
    if (!checkScreenSize()) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      removeClonedContent();
      categoriesItems.scrollLeft = 0;
      return;
    }

    if (isAutoScrolling && !userInteracting) {
      categoriesItems.scrollLeft += scrollSpeed;

      if (categoriesItems.scrollLeft >= resetPoint) {
        categoriesItems.scrollLeft = 0;
      }
    }

    animationId = requestAnimationFrame(autoScroll);
  }

  categoriesItems.addEventListener('mouseenter', () => {
    if (checkScreenSize()) {
      userInteracting = true;
      isAutoScrolling = false;
    }
  });

  categoriesItems.addEventListener('mouseleave', () => {
    if (checkScreenSize()) {
      userInteracting = false;
      isAutoScrolling = true;
    }
  });

  categoriesItems.addEventListener('touchstart', () => {
    if (checkScreenSize()) {
      userInteracting = true;
      isAutoScrolling = false;
    }
  }, { passive: true });

  categoriesItems.addEventListener('touchend', () => {
    if (checkScreenSize()) {
      setTimeout(() => {
        userInteracting = false;
        isAutoScrolling = true;
      }, 2000);
    }
  }, { passive: true });

  let scrollTimeout;
  categoriesItems.addEventListener('scroll', () => {
    if (!checkScreenSize()) return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (!userInteracting) {
        isAutoScrolling = true;
      }
    }, 1500);
  }, { passive: true });

  if (checkScreenSize()) {
    cloneContent();
    autoScroll();
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (checkScreenSize()) {
        cloneContent();
        if (!animationId) {
          autoScroll();
        }
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        removeClonedContent();
        categoriesItems.scrollLeft = 0;
        isAutoScrolling = true;
        userInteracting = false;
      }
    }, 200);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initShopCarousel();
    initCategoriesCarousel();
  });
} else {
  initShopCarousel();
  initCategoriesCarousel();
}
