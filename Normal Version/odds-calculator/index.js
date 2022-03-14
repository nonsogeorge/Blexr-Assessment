const oddFormat = document.querySelector("#select");
const stake = document.querySelector(".placeholder");
let odds = [...document.querySelectorAll(".odds")];
const payoutEl = document.querySelector(".payout_btn");
const inputDivEl = document.querySelector(".odd_input");
const addBtn = document.querySelector(".add-odd");
const clearBtn = document.querySelector(".clear_txt");
let errorDiv = document.querySelector(".error-div");

function validate(el, index) {
  let regex = /^[0-9]*$/;
  if (
    el.value.slice(index).length < 3 ||
    !regex.test(el.value.split("").slice(index).join(""))
  ) {
    errorDiv.innerHTML = `please input the right format e.g -110`;

    setTimeout(() => {
      errorDiv.innerHTML = "";
    }, 3000);
    return;
  }
}

// getting the value of format initially
let select = oddFormat.value;

// Adding input fields for multiple bets
let html = `<input
  type="text"
  class="odds"
  name="odds"
  placeholder="Enter odds"/>
`;

// adding input fields
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputDivEl.insertAdjacentHTML("beforeend", html);

  odds = [...document.querySelectorAll(".odds")];
  setPlaceholder(select);
});

// Dynamically setting the value of placeholder
function setPlaceholder(format) {
  let example = "";
  if (format === "American") {
    example = "e.g, -110, +110";
  } else if (format === "Fractal") {
    example = "e.g, 5/2, 3/2";
  } else if (format === "Decimal") {
    example = "e.g, 1.91, 2.10";
  }

  odds.forEach((el) => {
    el.placeholder = example;
  });
}

// setting initial placeholder
setPlaceholder(select);

// changing value of format on select
oddFormat.addEventListener("change", (e) => {
  e.preventDefault();
  select = oddFormat.value;
  setPlaceholder(select);
});

// calculating payout
payoutEl.addEventListener("click", (e) => {
  e.preventDefault();

  if (+stake.value <= 0) {
    errorDiv.innerHTML = `Stake cannot be less than $1`;
    setTimeout(() => {
      errorDiv.innerHTML = "";
    }, 3000);
    return;
  }

  let value = 1;

  switch (select) {
    case "American":
      odds.forEach((el) => {
        if (el.value.startsWith("-")) {
          validate(el, 1);
          value *= 1 - 100 / el.value;
        } else if (el.value.startsWith("+")) {
          validate(el, 1);

          value *= +el.value / 100 + 1;
        } else {
          validate(el, 0);
          value *= +el.value / 100 + 1;
        }
      });
      payoutEl.innerHTML = `$ ${(stake.value * value).toFixed(2)}`;
      value = 1;
      break;

    case "Decimal":
      odds.forEach((el) => {
        if (el.value < 1) {
          errorDiv.innerHTML = `odd(s) cannot be less than 1`;

          setTimeout(() => {
            errorDiv.innerHTML = "";
          }, 3000);
          return;
        }
        value *= +el.value;
      });
      payoutEl.innerHTML = `$${(stake.value * value).toFixed(2)}`;
      value = 1;
      break;

    case "Fractal":
      let regex = /^\d(.*\d)?$/;
      odds.forEach((el) => {
        if (!regex.test(el.value) || !el.value.includes("/")) {
          errorDiv.innerHTML = `Kindly input the rigth format, e.g 11/5`;

          setTimeout(() => {
            errorDiv.innerHTML = "";
          }, 3000);
          return;
        }
        let val = el.value.split("/");
        value *= +val[0] / +val[1] + 1;
      });
      payoutEl.innerHTML = `$ ${(stake.value * value).toFixed(2)}`;
      value = 1;
      break;
    default:
      return;
  }
});

// clearing input field
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  odds = [...document.querySelectorAll(".odds")][0];

  odds.value = "";
  location.reload();
});
