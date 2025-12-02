"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // DOM-elementer
  const havfrue = document.getElementById("havfrue1");
  const havfrueLukket = document.querySelector(".havfrue-lukket");
  const havfrueAaben = document.querySelector(".havfrue-open");
  const boble = document.querySelector(".taleboble");
  const bobleBillede = document.getElementById("taleboble-billede");

  // Kiste-elementer
  const lukketKiste = document.getElementById("lukketkiste");
  const aabenKiste = document.getElementById("abenkiste");

  //baggrundsmusik
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    bgMusic.volume = 0.2;
    // Kan blive blokeret af browseren, men koden er ok
    bgMusic.play().catch(() => {
      // Ignorer hvis autoplay bliver blokeret
    });
  }

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
    { klasse: "starfish", billede: "../img/talebobler/sostjerne-boble.png" },
    { klasse: "fish1", billede: "../img/talebobler/klovnefisk-boble.png" },
    { klasse: "fish2", billede: "../img/talebobler/palet-kirurg-boble.png" },
    { klasse: "fish3", billede: "../img/talebobler/kuglefisk-boble.png" },
    { klasse: "fish4", billede: "../img/talebobler/gul-kirurg-boble.png" },
    { klasse: "fish5", billede: "../img/talebobler/moorish-idol-boble.png" },
    { klasse: "fish6", billede: "../img/talebobler/rensefisk-boble.png" },
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

  // hent fisk fra HTML (via ID)
  const getKlovnefisk = document.getElementById("klovnefisk");
  const getPaletKirurg = document.getElementById("palet-kirurg");
  const getKuglefisk = document.getElementById("kuglefisk");
  const getGulKirurg = document.getElementById("gul-kirurg");
  const getMoorishIdol = document.getElementById("moorish-idol");
  const getRensefisk = document.getElementById("rensefisk");
  const getStarfish = document.getElementById("starfish");

  // hent lydfiler
  const soundBlob = new Audio("../sound/blob.wav");
  const kuglefiskLyd = new Audio("../sound/kuglefisk.mp3");
  const klovneFiskLyd = new Audio("../sound/klovnefisk.mp3");
  const paletKirurgLyd = new Audio("../sound/paletkirurg.mp3");
  const gulKirurgLyd = new Audio("../sound/gulfisk.mp3");
  const moorishIdolLyd = new Audio("../sound/moorishidol.mp3");
  const rensefiskLyd = new Audio("../sound/rensefisk.mp3");
  const starfishLyd = new Audio("../sound/sostjerne.mp3");
  const soundAngel = new Audio("../sound/angels.wav");

  // funktion som spiller begge lyde i rækkefølge
  function spilLyde(taleLyd) {
    if (!taleLyd) return; // safety, hvis man glemmer at sende noget med

    soundBlob.currentTime = 0;
    soundBlob.play();

    setTimeout(() => {
      taleLyd.currentTime = 0;
      taleLyd.play();
    }, 300);
  }

  // klik på fiskene = spil lyde
  if (getKlovnefisk)
    getKlovnefisk.addEventListener("click", () => spilLyde(klovneFiskLyd));
  if (getPaletKirurg)
    getPaletKirurg.addEventListener("click", () => spilLyde(paletKirurgLyd));
  if (getKuglefisk)
    getKuglefisk.addEventListener("click", () => spilLyde(kuglefiskLyd));
  if (getGulKirurg)
    getGulKirurg.addEventListener("click", () => spilLyde(gulKirurgLyd));
  if (getMoorishIdol)
    getMoorishIdol.addEventListener("click", () => spilLyde(moorishIdolLyd));
  if (getRensefisk)
    getRensefisk.addEventListener("click", () => spilLyde(rensefiskLyd));
  if (getStarfish)
    getStarfish.addEventListener("click", () => spilLyde(starfishLyd));

  // Kiste: lyd + åben/luk toggle
  if (lukketKiste && aabenKiste) {
    // start med lukket kiste synlig
    lukketKiste.style.display = "block";
    aabenKiste.style.display = "none";

    lukketKiste.addEventListener("click", () => {
      spilLyde(soundAngel);
      lukketKiste.style.display = "none";
      aabenKiste.style.display = "block";
    });

    aabenKiste.addEventListener("click", () => {
      aabenKiste.style.display = "none";
      lukketKiste.style.display = "block";
    });
  }
});
