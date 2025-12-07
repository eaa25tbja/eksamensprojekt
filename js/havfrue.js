"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------------------
     Henter DOM-elementer
  --------------------------------------------- */
  const havfrueOpen = document.querySelector(".havfrue-open");
  const havfrueLukket = document.querySelector(".havfrue-lukket");

  const boble = document.querySelector(".taleboble");
  const bobleBillede = document.getElementById("taleboble-billede");

  const lukketKiste = document.getElementById("lukketkiste");
  const aabenKiste = document.getElementById("abenkiste");

  const cta = document.querySelector(".cta");

  /* ------------------------------------------
     Baggrundsmusik
  --------------------------------------------- */
  /* 
- Forsøger autoplay.
- Starter musik ved første klik hvis autoplay fejler.
*/
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    bgMusic.currentTime = 0;
    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => {});
  }

  document.addEventListener("click", function startMusic() {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
    }
    document.removeEventListener("click", startMusic);
  });

  /* ------------------------------------------
     Havfrue mundstyring + tale-animation
  --------------------------------------------- */
  function havfrueSnak(isOpen) {
    if (!havfrueOpen || !havfrueLukket) return;

    if (isOpen) {
      havfrueLukket.style.display = "none";
      havfrueOpen.style.display = "block";
    } else {
      havfrueOpen.style.display = "none";
      havfrueLukket.style.display = "block";
    }
  }

  let talkInterval = null;

  function startTalking() {
    if (talkInterval) return;

    let open = true;
    havfrueSnak(true);

    talkInterval = setInterval(() => {
      open = !open;
      havfrueSnak(open);
    }, 150);
  }

  function stopTalking() {
    if (talkInterval) {
      clearInterval(talkInterval);
      talkInterval = null;
    }
    havfrueSnak(false);
  }

  // Start med lukket mund
  havfrueSnak(false);

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
     Lydfiler
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
  const krabbeLyd = new Audio("../sound/krabbe.mp3");
  const ctaLyd = new Audio("../sound/cta.mp3");

  // Alle tale-lyde (fisk + kiste + krabbe) – ikke CTA
  const fiskLyde = [
    kuglefiskLyd,
    klovneFiskLyd,
    paletKirurgLyd,
    gulKirurgLyd,
    moorishIdolLyd,
    rensefiskLyd,
    starfishLyd,
    soundAngel,
    krabbeLyd,
  ];

  function stopFiskLyde() {
    fiskLyde.forEach((lyd) => {
      lyd.pause();
      lyd.currentTime = 0;
    });
    stopTalking();
  }

  /* ------------------------------------------
     Funktion: Spil blob + tale-lyd + mund
  --------------------------------------------- */
  function spilLyde(taleLyd) {
    if (!taleLyd) return;

    stopFiskLyde();
    ctaLyd.pause();
    ctaLyd.currentTime = 0;

    soundBlob.currentTime = 0;
    soundBlob.play();

    setTimeout(() => {
      taleLyd.currentTime = 0;

      if (taleLyd !== soundAngel) {
        startTalking();
      }

      taleLyd.play();

      taleLyd.onended = () => {
        if (taleLyd !== soundAngel) {
          stopTalking();
        }
      };
    }, 300);
  }

  /* ------------------------------------------
     Klik på fisk = vis taleboble
  --------------------------------------------- */
  fisk.forEach(function (fiskObjekt) {
    const element = document.getElementsByClassName(fiskObjekt.klasse)[0];

    if (element) {
      element.addEventListener("click", function (event) {
        event.stopPropagation();

        if (cta) cta.style.display = "none";

        ctaLyd.pause();
        ctaLyd.currentTime = 0;

        if (
          boble.style.display === "block" &&
          bobleBillede.src.includes(fiskObjekt.billede)
        ) {
          boble.style.display = "none";
          stopTalking();
          if (cta) cta.style.display = "block";
        } else {
          bobleBillede.src = fiskObjekt.billede;
          boble.style.display = "block";
          // mundanimation styres af selve lyden, ikke her
        }
      });
    }
  });

  /* ------------------------------------------
     Klik udenfor = luk taleboble + CTA-lyd + mund
  --------------------------------------------- */
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".fish") &&
      !event.target.closest(".taleboble") &&
      !event.target.closest(".krabbe") &&
      !event.target.closest("#lukketkiste") &&
      !event.target.closest("#abenkiste")
    ) {
      boble.style.display = "none";

      stopFiskLyde();

      if (cta) cta.style.display = "block";

      ctaLyd.currentTime = 0;
      startTalking();
      ctaLyd.play();

      ctaLyd.onended = () => {
        stopTalking();
      };
    }
  });

  /* ------------------------------------------
     Klik på fisk = spil lyd
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
  if (getKrabbe) getKrabbe.addEventListener("click", () => spilLyde(krabbeLyd));

  /* ------------------------------------------
     Kiste toggle + lyd
  --------------------------------------------- */
  if (lukketKiste && aabenKiste) {
    lukketKiste.style.display = "block";
    aabenKiste.style.display = "none";

    lukketKiste.addEventListener("click", () => {
      spilLyde(soundAngel, false);
      lukketKiste.style.display = "none";
      aabenKiste.style.display = "block";
    });

    aabenKiste.addEventListener("click", () => {
      aabenKiste.style.display = "none";
      lukketKiste.style.display = "block";
      stopFiskLyde();
    });
  }
});
