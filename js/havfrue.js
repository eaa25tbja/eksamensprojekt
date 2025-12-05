"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------------------
     Henter DOM-elementer
  --------------------------------------------- */
  const havfrue = document.getElementById("havfrue1");
  const havfrueLukket = document.querySelector(".havfrue-lukket");
  const havfrueAaben = document.querySelector(".havfrue-open");

  const boble = document.querySelector(".taleboble");
  const bobleBillede = document.getElementById("taleboble-billede");

  const lukketKiste = document.getElementById("lukketkiste");
  const aabenKiste = document.getElementById("abenkiste");

  const cta = document.querySelector(".cta"); // CTA-boblen

  /* ------------------------------------------
     Baggrundsmusik
  --------------------------------------------- */
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => {
      // autoplay kan blive blokeret, det er ok
    });
  }

  /* ------------------------------------------
     Funktion: Skift havfruens mund
  --------------------------------------------- */
  function havfrueSnak(start) {
    if (start) {
      havfrueLukket.style.display = "none";
      havfrueAaben.style.display = "block";
    } else {
      havfrueAaben.style.display = "none";
      havfrueLukket.style.display = "block";
    }
  }

  /* ------------------------------------------
     Fiske-array med boble-billeder
  --------------------------------------------- */
  const fisk = [
    { klasse: "starfish", billede: "../img/talebobler/sostjerne-boble.png" },
    { klasse: "fish1", billede: "../img/talebobler/klovnefisk-boble.png" },
    { klasse: "fish2", billede: "../img/talebobler/palet-kirurg-boble.png" },
    { klasse: "fish3", billede: "../img/talebobler/kuglefisk-boble.png" },
    { klasse: "fish4", billede: "../img/talebobler/gul-kirurg-boble.png" },
    { klasse: "fish5", billede: "../img/talebobler/moorish-idol-boble.png" },
    { klasse: "fish6", billede: "../img/talebobler/rensefisk-boble.png" },
    { klasse: "krabbe", billede: "../img/talebobler/krabbe-boble.png" },
  ];

  /* ------------------------------------------
     Hent lydfiler
  --------------------------------------------- */
  const soundBlob = new Audio("../sound/blob.wav");
  const kuglefiskLyd = new Audio("../sound/kuglefisk.mp3");
  const klovneFiskLyd = new Audio("../sound/klovnefisk.mp3");
  const paletKirurgLyd = new Audio("../sound/paletkirurg.mp3");
  const gulKirurgLyd = new Audio("../sound/gulfisk.mp3");
  const moorishIdolLyd = new Audio("../sound/moorishidol.mp3");
  const rensefiskLyd = new Audio("../sound/rensefisk.mp3");
  const starfishLyd = new Audio("../sound/sostjerne.mp3");
  const soundAngel = new Audio("../sound/angels.wav");
  const ctaLyd = new Audio("../sound/cta.mp3"); // CTA-lyd (ret sti/filnavn hvis nødvendigt)

  // Alle "tale-lyde" (fisk + kiste) – ikke CTA
  const fiskLyde = [
    kuglefiskLyd,
    klovneFiskLyd,
    paletKirurgLyd,
    gulKirurgLyd,
    moorishIdolLyd,
    rensefiskLyd,
    starfishLyd,
    soundAngel,
  ];

  // Stop alle fiskelyde
  function stopFiskLyde() {
    fiskLyde.forEach((lyd) => {
      lyd.pause();
      lyd.currentTime = 0;
    });
  }

  /* ------------------------------------------
     Funktion: Spil blob + tale-lyd
  --------------------------------------------- */
  function spilLyde(taleLyd) {
    if (!taleLyd) return;

    // Stop andre lyde før vi spiller ny
    stopFiskLyde();
    ctaLyd.pause();
    ctaLyd.currentTime = 0;

    soundBlob.currentTime = 0;
    soundBlob.play();

    setTimeout(() => {
      taleLyd.currentTime = 0;
      taleLyd.play();
    }, 300);
  }

  /* ------------------------------------------
     Klik på fisk/krabbe = vis taleboble
  --------------------------------------------- */
  fisk.forEach(function (fiskObjekt) {
    const element = document.getElementsByClassName(fiskObjekt.klasse)[0];

    if (element) {
      element.addEventListener("click", function (event) {
        event.stopPropagation();

        // Skjul CTA når en fisk vælges
        if (cta) cta.style.display = "none";

        // Stop CTA-lyd hvis den evt. spiller
        ctaLyd.pause();
        ctaLyd.currentTime = 0;

        // Hvis samme boble vises → luk boble og vis CTA
        if (
          boble.style.display === "block" &&
          bobleBillede.src.includes(fiskObjekt.billede)
        ) {
          boble.style.display = "none";
          havfrueSnak(false);
          if (cta) cta.style.display = "block";
        } else {
          // Ellers vis boble med nyt billede
          bobleBillede.src = fiskObjekt.billede;
          boble.style.display = "block";
          havfrueSnak(true);
        }
      });
    }
  });

  /* ------------------------------------------
     Klik udenfor = luk taleboble + vis CTA + spil CTA-lyd
  --------------------------------------------- */
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".fish") &&
      !event.target.closest(".taleboble") &&
      !event.target.closest(".krabbe")
    ) {
      boble.style.display = "none";
      havfrueSnak(false);

      // Stop alle fiskelyde og spil CTA-lyd
      stopFiskLyde();
      ctaLyd.currentTime = 0;
      ctaLyd.play();

      if (cta) cta.style.display = "block";
    }
  });

  // Start med lukket mund
  havfrueSnak(false);

  /* ------------------------------------------
     Klik på fisk = spil lyd (via ID)
  --------------------------------------------- */
  const getKlovnefisk = document.getElementById("klovnefisk");
  const getPaletKirurg = document.getElementById("palet-kirurg");
  const getKuglefisk = document.getElementById("kuglefisk");
  const getGulKirurg = document.getElementById("gul-kirurg");
  const getMoorishIdol = document.getElementById("moorish-idol");
  const getRensefisk = document.getElementById("rensefisk");
  const getStarfish = document.getElementById("starfish");
  const getKrabbe = document.getElementById("krabbe");

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
  // Hvis krabben også får lyd senere:
  // if (getKrabbe) getKrabbe.addEventListener("click", () => spilLyde(krabbeLyd));

  /* ------------------------------------------
     Kiste toggle + lyd
  --------------------------------------------- */
  if (lukketKiste && aabenKiste) {
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
