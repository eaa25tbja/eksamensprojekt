"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // DOM-elementer
  const havfrue = document.getElementById("havfrue1");
  const havfrueLukket = document.querySelector(".havfrue-lukket");
  const havfrueAaben = document.querySelector(".havfrue-åben");
  const boble = document.querySelector(".taleboble");
  const bobleBillede = document.getElementById("taleboble-billede");

  // Funktion: Skift havfruens mund
  function havfrueSnak(start) {
    if (start) {
      havfrueLukket.style.display = "none";
      havfrueAaben.style.display = "block";
    } else {
      havfrueAaben.style.display = "none";
      havfrueLukket.style.display = "block";
    }
  }

  // Fiske-array
  const fisk = [
    { klasse: "starfish", billede: "img/infoseastar.png" },
    { klasse: "fish1", billede: "img/infonemo.png" },
    { klasse: "fish2", billede: "img/infodory.png" },
    { klasse: "fish3", billede: "img/infokugle.png" },
    { klasse: "fish4", billede: "img/infogulkirug.png" },
    { klasse: "fish5", billede: "img/infomoorish.png" },
    { klasse: "fish6", billede: "img/infobluestriped.png" },
  ];

  // Click-event for hver fisk
  fisk.forEach(function (fiskObjekt) {
    const element = document.getElementsByClassName(fiskObjekt.klasse)[0];
    if (element) {
      element.addEventListener("click", function (event) {
        event.stopPropagation();
        if (
          boble.style.display === "block" &&
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

  // Klik udenfor = luk taleboble
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".fish") && !event.target.closest(".taleboble")) {
      boble.style.display = "none";
      havfrueSnak(false);
    }
  });

  // Start med lukket mund
  havfrueSnak(false);

  // hent fisk fra HTML
  const getNemo = document.getElementById("nemo");
  const getDory = document.getElementById("dory");
  const getKuglefisk = document.getElementById("kuglefisk");
  const getYellowFish = document.getElementById("yellowFish");
  const getMoorishl = document.getElementById("moorishl");
  const getRensefisk = document.getElementById("rensefisk");
  const getStarFish = document.getElementById("star");

  // hent lydfiler
  const soundBlob = new Audio("sound/blob.wav");
  const kuglelyd = new Audio("sound/kuglefisk.mp3");
  const nemolyd = new Audio("sound/klovnefisk.mp3");
  const dorylyd = new Audio("sound/paletkirurg.mp3");
  const gullyd = new Audio("sound/gulfisk.mp3");
  const moolyd = new Audio("sound/moorishidol.mp3");
  const stribelyd = new Audio("sound/rensefisk.mp3");
  const starfishlyd = new Audio("sound/sostjerne.mp3");

  // funktion som spiller begge lyde i rækkefølge
  function spilLyde(taleLyd) {
    soundBlob.currentTime = 0; // starter blob fra begyndelsen
    soundBlob.play(); // spiller blob

    // venter 300 millisekunder (0,3 sek), så blob når at lyde først
    setTimeout(() => {
      taleLyd.currentTime = 0; // starter havfruen fra begyndelsen
      taleLyd.play(); // spiller havfruens stemme
    }, 300);
  }

  // klik på fiskene = spil lyde
  if (getNemo) getNemo.addEventListener("click", () => spilLyde(nemolyd));
  if (getDory) getDory.addEventListener("click", () => spilLyde(dorylyd));
  if (getKuglefisk)
    getKuglefisk.addEventListener("click", () => spilLyde(kuglelyd));
  if (getYellowFish)
    getYellowFish.addEventListener("click", () => spilLyde(gullyd));
  if (getMoorishl)
    getMoorishl.addEventListener("click", () => spilLyde(moolyd));
  if (getRensefisk)
    getRensefisk.addEventListener("click", () => spilLyde(stribelyd));
  if (getStarFish)
    getStarFish.addEventListener("click", () => spilLyde(starfishlyd));
});

//???????

// document.addEventListener("DOMContentLoaded", function () {
// DOM-elementer
// const havfrueLukket = document.querySelector(".havfrue-lukket");
// const havfrueAaben = document.querySelector(".havfrue-åben");
// const boble = document.querySelector(".taleboble");
// const bobleBillede = document.getElementById("taleboble-billede");

// Funktion der skifter havfruens mund
// function havfrueSnak(start) {
//   if (start === true) {
//     havfrueLukket.style.display = "none";
//     havfrueAaben.style.display = "block";
//   } else {
//     havfrueLukket.style.display = "block";
//     havfrueAaben.style.display = "none";
//   }
// }

// Tilføjer click-listener på hver fisk
// fisk.forEach(function (fiskObjekt) {
//   const elem = document.getElementsByClassName(fiskObjekt.klasse)[0];
//   if (elem) {
//     elem.addEventListener("click", function () {
//       if (
//         boble.style.display === "block" &&
//         bobleBillede.src &&
//         bobleBillede.src.includes(fiskObjekt.billede)
//       ) {
//         boble.style.display = "none";
//         havfrueSnak(false);
//       } else {
//         bobleBillede.src = fiskObjekt.billede;
//         boble.style.display = "block";
//         havfrueSnak(true);
//       }
//     });
//   }
// });

// Klik udenfor fisk + taleboble = skjul boble og luk mund
// document.addEventListener("click", function (event) {
//   if (event.target.closest(".fish") || event.target.closest(".taleboble")) {
//     return;
//   } else {
//     boble.style.display = "none";
//     havfrueSnak(false);
//   }
// });

// Sørg for at havfrue er lukket ved start
//   havfrueSnak(false);
// });
