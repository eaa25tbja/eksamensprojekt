"use strict";


document.addEventListener("DOMContentLoaded", function () {
  // DOM-elementer
  const havfrueLukket = document.querySelector(".havfrue-lukket");
  const havfrueAaben = document.querySelector(".havfrue-åben");
  const boble = document.querySelector(".taleboble");
  const bobleBillede = document.getElementById("taleboble-billede");

  // Funktion der skifter havfruens mund
  function havfrueSnak(start) {
    if (start === true) {
      havfrueLukket.style.display = "none";
      havfrueAaben.style.display = "block";
    } else {
      havfrueLukket.style.display = "block";
      havfrueAaben.style.display = "none";
    }
  }

  // Liste over fisk -> className og hvilken billede-fil taleboblen skal vise
  const fisk = [
    { klasse: "starfisk", billede: "havfrue-img/infoseastar.png" },
    { klasse: "nemo", billede: "havfrue-img/infonemo.png" },
    { klasse: "dory", billede: "havfrue-img/infodory.png" },
    { klasse: "ondfisk", billede: "havfrue-img/infomoorish.png" },
    { klasse: "gulfisk", billede: "havfrue-img/infogulkirug.png" },
    { klasse: "stribefisk", billede: "havfrue-img/infobluestriped.png" },
    { klasse: "kuglefisklille", billede: "havfrue-img/infokugle.png" },
  ];

  // Tilføjer click-listener på hver fisk
  fisk.forEach(function (fiskObjekt) {
    const elem = document.getElementsByClassName(fiskObjekt.klasse)[0];
    if (elem) {
      elem.addEventListener("click", function () {
        if (
          boble.style.display === "block" &&
          bobleBillede.src &&
          bobleBillede.src.includes(fiskObjekt.billede)
        ) {
          boble.style.display = "none";
          havfrueSnak(false);
        } else {
          bobleBillede.src = fiskObjekt.billede;
          boble.style.display = "block";
          havfrueSnak(true);
        }
      });
    }
  });

  // Klik udenfor fisk + taleboble = skjul boble og luk mund
  document.addEventListener("click", function (event) {
    if (event.target.closest(".fish") || event.target.closest(".taleboble")) {
      return;
    } else {
      boble.style.display = "none";
      havfrueSnak(false);
    }
  });

  // Sørg for at havfrue er lukket ved start
  havfrueSnak(false);
});











// Hent DOM Elementer

const getRedCar = document.getElementById("redCar");
const getPoliceCar = document.getElementById("policeCar");
const getBlueCar = document.getElementById("blueCar");
const sun = document.querySelector(".sun");
const scene = document.querySelector(".scene");

// Opretter lydObjekter
const soundRedCar = new Audio();
soundRedCar.src = "../sound/red-car-horn.wav";
const soundPoliceCar = new Audio();
soundPoliceCar.src = "../sound/police-car-sound.wav";
const soundBlueCar = new Audio();
soundBlueCar.src = "../sound/blue-car-sound.wav";

if (getRedCar) {
  getRedCar.addEventListener("click", () => {
    soundRedCar.play();
  });
}

if (getBlueCar) {
  getBlueCar.addEventListener("click", () => {
    soundBlueCar.play();
  });
}

if (getPoliceCar) {
  getPoliceCar.addEventListener("click", () => {
    soundPoliceCar.play();
  });
}

if (sun && scene) {
  sun.addEventListener("click", () => {
    scene.classList.toggle("night");
  });
}

// lille bevægelse af havfrue
const mermaid = document.querySelector(".mermaid");

function randomMove() {
  const randomY = Math.random() * 40 + 30; // procent af højden
  mermaid.style.bottom = `${randomY}%`;
}

setInterval(randomMove, 3000); // flytter lidt op/ned hvert 3. sekund
