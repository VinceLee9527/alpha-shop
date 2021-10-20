const main = document.getElementById("main-content");
const formParts = document.querySelectorAll(".part-container");
const stepControl = document.getElementById("stepper-control");
const steps = stepControl.querySelectorAll(".step");
const btnControl = document.getElementById("btn-control");
const nextBtn = btnControl.querySelector(".btn-primary");
const prevBtn = btnControl.querySelector(".btn-outline");
const totalPrice = document.querySelector(".total-price");
const totalDelivery = main.querySelector(".delivery-fee");
const darkTheme = document.querySelector(".theme-dark");
const lightTheme = document.querySelector(".theme-light");
const darkLogoHeader = document.querySelector(".navbar-logo-dark");
const lightLogoHeader = document.querySelector(".navbar-logo-light");
const darkLogoFooter = document.querySelector(".footer-logo-dark");
const lightLogoFooter = document.querySelector(".footer-logo-light");

let step = 0;
let total = 5298;
let deliveryFee = 0;

// function that adds comma to numbers (checkout section)
let numberWithCommas = x => x.toLocaleString();

// function for increasing item number in cart (checkout section)
let itemNumClicked = e => {
  if (
    e.target.matches(".product-quantity-minus") &&
    e.target.nextElementSibling.innerText !== "1"
  ) {
    let price = e.target.parentElement.nextElementSibling.innerText;
    let productQty = e.target.nextElementSibling.innerText;
    total -= Number(price.replace(/[^0-9\.]+/g, ""));
    e.target.nextElementSibling.innerText = Number(productQty) - 1;
  } else if (e.target.matches(".product-quantity-plus")) {
    let price = e.target.parentElement.nextElementSibling.innerText;
    let productQty = e.target.previousElementSibling.innerText;
    total += Number(price.replace(/[^0-9\.]+/g, ""));
    e.target.previousElementSibling.innerText = Number(productQty) + 1;
  }

  if (e.target.matches("#dhl")) {
    totalDelivery.innerText = "$500";
    deliveryFee += 500;
  } else if (e.target.matches("#standard")) {
    totalDelivery.innerText = "免費";
    deliveryFee -= 500;
  }
  totalPrice.innerText = "$" + numberWithCommas(total + Number(deliveryFee));
}

// function for prev/next form control (form section)
let handleBtnControlClicked = e => {
  e.preventDefault();
  const nowStep = steps[step];
  if (e.target.matches(".btn-primary") && e.target.innerHTML === "下一步") {
    const nextStep = steps[step + 1];
    nowStep.classList.remove("active");
    nowStep.classList.add("checked");
    nextStep.classList.add("active");
    formParts[step].classList.toggle("d-none");
    formParts[step + 1].classList.toggle("d-none");
    step += 1;
  } else if (e.target.matches(".btn-outline")) {
    const prevStep = steps[step - 1];
    nowStep.classList.remove("active");
    prevStep.classList.remove("checked");
    prevStep.classList.add("active");
    formParts[step].classList.toggle("d-none");
    formParts[step - 1].classList.toggle("d-none");
    step -= 1;
  }
  setBtnDisabled();
}

// function that adds style to prev/next form button (form section)
let setBtnDisabled = () => {
  if (step === 0) {
    prevBtn.classList.remove("d-flex");
  } else {
    prevBtn.classList.add("d-flex");
  }

  if (step === 2) {
    nextBtn.innerHTML = "確認下單";
  } else {
    nextBtn.innerHTML = "下一步";
  }
}

darkTheme.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "dark");
  darkTheme.classList.add("d-none");
  lightTheme.classList.remove("d-none");
  lightLogoHeader.classList.add("d-none");
  darkLogoHeader.classList.remove("d-none");
  lightLogoFooter.classList.add("d-none");
  darkLogoFooter.classList.remove("d-none");
});

lightTheme.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "light");
  lightTheme.classList.add("d-none");
  darkTheme.classList.remove("d-none");
  lightLogoHeader.classList.remove("d-none");
  darkLogoHeader.classList.add("d-none");
  lightLogoFooter.classList.remove("d-none");
  darkLogoFooter.classList.add("d-none");
});

main.addEventListener("click", itemNumClicked);
btnControl.addEventListener("click", handleBtnControlClicked);
