const main = document.getElementById("main-content");
const formParts = document.querySelectorAll(".part-container");
const stepControl = document.getElementById("stepper-control");
const steps = stepControl.querySelectorAll(".step");
const btnControl = document.getElementById("btn-control");
const nextBtn = btnControl.querySelector(".btn-primary");
const prevBtn = btnControl.querySelector(".btn-outline");
const totalPrice = document.querySelector(".total-price");
const totalDelivery = main.querySelector(".delivery-fee");
let step = 0;
let total = 5298;
let deliveryFee = 0;

let numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


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

main.addEventListener("click", itemNumClicked);
btnControl.addEventListener("click", handleBtnControlClicked);
