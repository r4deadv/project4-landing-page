/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */
document.addEventListener("DOMContentLoaded", function () {
  navBar();
});
/**
 * Define Global Variables
 *
 */
const header = document.querySelector(".page__header");
const sections = document.getElementsByClassName("section");
const navigation = document.getElementById("navbar__list");
const navItems = document.getElementsByClassName("menu__link");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav dynamically
function navBar() {
  for (let i = 0; i < sections.length; i++) {
    const li = document.createElement("li");
    const tag = document.createElement("a");
    const sectionName = sections[i].getAttribute("data-nav");
    const sectionNamePart = sectionName.replace(/\s/g, "").toLocaleLowerCase();
    tag.setAttribute("href", "#" + sectionNamePart);
    tag.setAttribute("id", "linkNumber" + [i + 1]);
    tag.setAttribute("class", "menu__link");
    tag.innerText = sectionName;
    li.appendChild(tag);
    navigation.appendChild(li);
    document
      .getElementById("linkNumber" + [i + 1])
      .addEventListener("click", function () {
        Scrolling(i + 1);
      });
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to anchor ID using scrollTO event
// Scroll to section on link click
function Scrolling(i) {
  const section = document.getElementById("section" + i);
  const position = section.offsetTop;
  event.preventDefault();
  window.scrollTo({
    left: 0,
    top: position,
    behavior: "smooth",
  });
  // SmallMenu();
}
// hide menu when scrolling
const menu = document.getElementById("menu");
let userHasScrolled = false;
window.addEventListener("scroll", function (e) {
  userHasScrolled = true;
});

//scroll direction
let oldValue = 0;
window.addEventListener("scroll", function (e) {
  let newValue = window.pageYOffset;
  if (oldValue - newValue < 0) {
    console.log("Up");
  } else if (oldValue - newValue > 0) {
    console.log("Down");
  }
  oldValue = newValue;
});

// check which section is in viewport
function isInViewport(elem) {
  const rect = elem.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Set sections as active and navigation item highlight
document.addEventListener("scroll", function () {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (isInViewport(section)) {
      section.classList.add("your-active-class");
      navItems[i].classList.add("active-nav");
    } else {
      section.classList.remove("your-active-class");
      navItems[i].classList.remove("active-nav");
    }
  }
});

// Hide header when not scrolling
let timeoutId;
window.addEventListener("scroll", function () {
  header.style.opacity = "1";
  clearTimeout(timeoutId);
  if (window.pageYOffset !== 0) {
    timeoutId = setTimeout(function () {
      header.style.opacity = "0";
      header.style.transition = "opacity 0.5s";
    }, 1500);
  }
});
