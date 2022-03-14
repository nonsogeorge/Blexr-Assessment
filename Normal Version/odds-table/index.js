const selectSports = document.querySelector("#sport");
const selectRegion = document.querySelector("#region");
const selectMarket = document.querySelector("#market");
const filterBtn = document.querySelector(".btn");
const mainContainerEl = document.querySelector(".main_container");
const providerContainerEl = document.querySelector(".container");

let query = {};

window.addEventListener("DOMContentLoaded", () => {
  query = {
    key: "d3765ca5d4826a33c0ca3ca2b4ec6dc5",
    sport: selectSports.value,
    region: selectRegion.value,
    mkt: selectMarket.value,
  };

  fetchBetData(query);
});

// date and time formatter
function dateFormatter(dateString) {
  let date = new Date(dateString).toLocaleDateString("en-us", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  let time = new Date(dateString).toLocaleTimeString("en-us", {
    timeStyle: "short",
  });

  return `${date} - ${time}`;
}

// fetch data function
const fetchBetData = async ({ key, sport, region, mkt }) => {
  const res = await fetch(
    `https://api.the-odds-api.com/v3/odds/?apiKey=${key}&sport=${sport}&region=${region}&mkt=${mkt}`
  );

  const { data } = await res.json();
  data.forEach((el, index) => {
    if (index < 10) {
      renderOdds(el);
    }
  });
};

// button click
filterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  query = {
    key: "d3765ca5d4826a33c0ca3ca2b4ec6dc5",
    sport: selectSports.value,
    region: selectRegion.value,
    mkt: selectMarket.value,
  };

  mainContainerEl.innerHTML = "";
  fetchBetData(query);
});

function renderChildren(child) {
  let child1 = child.odds.h2h;

  // selecting odds to display based on market type
  if (query.mkt === "h2h") {
    child1 = child.odds.h2h;
  } else if (query.mkt === "spreads") {
    child1 = child.odds.spreads.odds;
  } else if (query.mkt === "totals") {
    child1 = child.odds.totals.odds;
  }

  let htmlList = `
    <div class="provider_container">
            <h3 class="provider_head">${child.site_nice}</h3>
            <div class="count">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div class="odds">
              <span class="odd">${child1[0] ? child1[0] : "---"}</span>
              <span class="odd">${child1[1] ? child1[1] : "---"}</span>
              <span class="odd">${child1[2] ? child1[2] : "---"}</span>
            </div>
          </div>
    `;

  return htmlList;
}

function renderOdds(data) {
  let children = "";

  data.sites.forEach((el) => {
    children += renderChildren(el);
  });

  let htmlMain = `
  <div class="container">
        <div class="event_container">
          <div class="event_head">
            <h2>${data.teams[0]}</h2>
            <p class="${data.teams[0] !== data.home_team ? "away" : ""}">
              <i class="fa-solid fa-house-user"></i>
            </p>
          </div>
          <span>vs</span>
          <div class="event_head">
            <h2>${data.teams[1]}</h2>
            <p class="${data.teams[1] !== data.home_team ? "away" : ""}">
              <i class="fa-solid fa-house-user"></i>
            </p>
          </div>
          <p class="date_time">${dateFormatter(data.commence_time)}</p>
        </div>
        <div class="provider_list"> ${children}
        </div>
      </div>
    `;

  mainContainerEl.insertAdjacentHTML("beforeend", htmlMain);
}
