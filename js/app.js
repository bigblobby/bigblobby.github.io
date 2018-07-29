//Navigation Section

// const mainNav = document.getElementById("main-nav");
const nav = document.getElementById("nav");
const mobileCheckbox = document.getElementById("menu-btn");
const topButton = document.getElementById("top-button");
const header = document.getElementById("main-header");
//Listening for clicks on links

topButton.addEventListener("click", () => {
  header.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
});

nav.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.textContent === "About") {
    document.getElementById("about-me")
            .scrollIntoView({ behavior: "smooth", alignToTop: false });
    mobileCheckbox.checked = false;
  } else if (e.target.textContent === "Projects") {
    document.getElementById("projects")
            .scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
    mobileCheckbox.checked = false;
  } else if (e.target.textContent === "Contact") {
    mobileCheckbox.checked = false;
    openContactSlider();
  }
});

//Hides and shows the navbar when scrolling

const navWrap = document.getElementById("nav-wrapper");

let previousPosition = window.pageYOffset;
window.addEventListener("scroll", () => {
  let currentPosition = window.pageYOffset;
  if (previousPosition > currentPosition) {
    navWrap.style.top = "0"; //Show
  } else if (window.pageYOffset === 0) {
    //This else if fixed a bug in safari...bloody safari
    navWrap.style.top = "0"; //Show
  } else {
    navWrap.style.top = "-62px"; //Hide
  }
  previousPosition = currentPosition;
});

//Contact Me Section

const contactMeButton = document.getElementById("contact-me-open");
const mainContactButton = document.getElementById("main-contact-button");
const slider = document.getElementById("contact-slider");
const contactArea = document.getElementById("contact-area");

//Open the 'contact me' slider

contactMeButton.addEventListener("click", e => {
  if (e.target.textContent === "Contact Me") {
    openContactSlider();
  }
});

mainContactButton.addEventListener("click", () => {
  openContactSlider();
});

function openContactSlider() {
  slider.style.transform = "translateX(0)";
  pageWrapper.classList.add("blur");
  setTimeout( () => pageWrapper.addEventListener("click", closeContactSlider), 50); //If page is clicked, except the slider area. Slider closes. The timeout fixes a bug, when clicking the navbar 'contact' link.
  console.log("Contact form opened");
}

function closeContactSlider() {
  slider.style.transform = "translateX(100%)";
  pageWrapper.classList.remove("blur");
  pageWrapper.removeEventListener("click", closeContactSlider);
  console.log("Contact form closed");
}

const form = document.getElementById("contact-form");

//This just prevents the form from defaulting, and the 'close' button doesn't need to be there. But i kept it to avoid confusion.

form.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    e.preventDefault();
    if (e.target.textContent === "Close") {
      closeContactSlider();
    }
  }
});

//MODAL window, click anywhere, it closes.

const modalCheckbox = document.getElementById("trigger");
const pageWrapper = document.getElementById("page-wrapper");
const overlay = document.getElementById("modal-overlay");
const modalCloseButton = document.getElementById("modal-close");

modalCheckbox.addEventListener("change", () => {
  if (modalCheckbox.checked) {
    setTimeout(() => window.addEventListener("click", closeModal), 50); //setTimeout fixed a bug in safari
    overlay.classList.add("modal-checked");
    pageWrapper.classList.add("blur");
    console.log("Modal opened");
  }
});

modalCloseButton.addEventListener("click", closeModal);

function closeModal() {
  window.removeEventListener("click", closeModal);
  overlay.classList.remove("modal-checked");
  pageWrapper.classList.remove("blur");
  modalCheckbox.checked = false;
  console.log("Modal closed");
}

//Work/Projects

const viewMoreButtons = document.querySelectorAll("#projects button");
const projectClose = document.querySelectorAll(".project-close");

viewMoreButtons.forEach(button => {
  button.addEventListener("click", e => {
    const projectContent = e.target.nextElementSibling.firstElementChild.nextElementSibling;
    e.target.nextElementSibling.classList.add("dropdown-active");
    setTimeout( () => (projectContent.style.opacity = 1), 400);
  });
});

projectClose.forEach(button => {
  button.addEventListener("click", e => {
    const projectContent = e.target.nextElementSibling;
    projectContent.style.opacity = 0;
    setTimeout( () => e.target.parentElement.classList.remove("dropdown-active"), 100);
  });
});
