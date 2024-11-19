const radios = document.querySelectorAll('input[name="type"]');
const textField = document.getElementById("amount");
const button = document.getElementById("inputbtn");
const errorElement = document.getElementById("error");
const radioOptions = document.querySelectorAll(".radio-option");
const clearButton = document.querySelector(".clear");
const monthlyRepay = document.getElementById("monthlyrepay");
const termRepay = document.getElementById("termrepay");
const empty = document.querySelector(".empty");
const completed = document.querySelector(".completed");

// Access them separately
const repaymentOption = radioOptions[0]; // First .radio-option (Repayment)
const interestOnlyOption = radioOptions[1]; // Second .radio-option (Interest Only)

let mortgageType = "";

// get the value of radio button
radios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    mortgageType = event.target.value;
    if (mortgageType === "Repayment") {
      repaymentOption.classList.add("checked");
      interestOnlyOption.classList.remove("checked");
    } else if (mortgageType === "Interest") {
      interestOnlyOption.classList.add("checked");
      repaymentOption.classList.remove("checked");
    }
  });
});

// Add focus and blur event listeners to the input field
textField.addEventListener("focus", () => {
  button.style.backgroundColor = "hsl(61, 70%, 52%)"; // Change button color on focus
  button.style.color = "hsl(202, 55%, 16%)"; // Optional: change text color
});

textField.addEventListener("blur", () => {
  button.style.backgroundColor = "hsl(202, 86%, 94%)"; // Revert button color on blur
  button.style.color = "hsl(200, 24%, 40%)"; // Revert text color
});

clearButton.addEventListener("click", () => {
  document.getElementById("form").reset();
  document
    .querySelectorAll(".error")
    .forEach((error) => (error.style.display = "none"));
  repaymentOption.classList.remove("checked");
  interestOnlyOption.classList.remove("checked");
  mortgageType = "";
});

document.getElementById("calculate").onclick = function () {
  validateForm();
};

function validateForm() {
  const principal = parseFloat(document.getElementById("amount").value);
  const years = parseFloat(document.getElementById("term").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const amountError = document.querySelector("#amountError");
  const termError = document.querySelector("#termError");
  const rateError = document.querySelector("#rateError");
  const typeError = document.querySelector("#radioError");
  let isValid = true;

  if (isNaN(principal) || principal <= 0) {
    amountError.style.display = "block"; //
    isValid = false;
  } else {
    amountError.style.display = "none";
  }

  if (isNaN(years) || years <= 0) {
    termError.style.display = "block";
    isValid = false;
  } else {
    termError.style.display = "none";
  }

  if (isNaN(annualRate) || annualRate <= 0) {
    rateError.style.display = "block";
    isValid = false;
  } else {
    rateError.style.display = "none";
  }

  if (!mortgageType) {
    typeError.style.display = "block";
    isValid = false;
  } else {
    typeError.style.display = "none";
  }

  if (isValid) {
    calculateMortgage(principal, years, annualRate);
    empty.style.display = "none";
    completed.style.display = "block";
  }else {
    empty.style.display = "block";
    completed.style.display = "none";
  }

  return isValid;
}

function calculateMortgage(principal, years, annualRate) {
  if (mortgageType === "Repayment") {
    calculateRepaymentMortgage(principal, years, annualRate);
  } else if (mortgageType === "Interest") {
    calculateInterestOnlyMortgage(principal, years, annualRate);
  }
}

function calculateRepaymentMortgage(principal, years, annualRate) {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  const monthlyPayments =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const totalRepayment = monthlyPayments * totalPayments;

  monthlyRepay.textContent = monthlyPayments.toLocaleString("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  termRepay.textContent = totalRepayment.toLocaleString("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calculateInterestOnlyMortgage(principal, years, annualRate) {
  const monthlyPayment = (principal * (annualRate / 100)) / 12;
  const totalRepayment = monthlyPayment * (years * 12); // Total interest paid over the term

  monthlyRepay.textContent = monthlyPayment.toLocaleString("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  termRepay.textContent = totalRepayment.toLocaleString("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
