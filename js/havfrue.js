"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------------------
     Henter DOM-elementer til havfruen, taleboblen,
     kisten og CTA-knappen
  --------------------------------------------- */
  const havfrueOpen = document.querySelector(".havfrue-open"); // havfrue med åben mund
  const havfrueLukket = document.querySelector(".havfrue-lukket"); // havfrue med lukket mund

  const boble = document.querySelector(".taleboble"); // container for taleboble
  const bobleBillede = document.getElementById("taleboble-billede"); // selve billedet i taleboblen

  const lukketKiste = document.getElementById("lukketkiste");
  const aabenKiste = document.getElementById("abenkiste");

  const cta = document.querySelector(".cta"); // “Tryk rundt i havet”-boblen

  /* ------------------------------------------
     Baggrundsmusik
     - Først forsøger jeg autoplay
     - Hvis browseren blokerer, starter jeg musikken
       ved første klik 
  --------------------------------------------- */
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    bgMusic.currentTime = 0; // start altid fra begyndelsen
    bgMusic.volume = 0.2; // lavere volume, så det ikke er for højt
    bgMusic.play().catch(() => {
      // hvis autoplay fejler, gør vi ikke noget her
    });
  }

  // Fallback: hvis autoplay er blokeret, så start musikken når brugeren klikker første gang
  document.addEventListener("click", function startMusic() {
    if (bgMusic && bgMusic.paused) {
      bgMusic.play().catch(() => {});
    }
    // Fjern listeneren igen så den kun kører én gang
    document.removeEventListener("click", startMusic);
  });

  /* ------------------------------------------
     Havfrue mundstyring + tale-animation
     - havfrueSnak() styrer hvilken mund der vises
     - startTalking()/stopTalking() - fake animation
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

  let talkInterval = null; // bruges til at gemme setInterval-id

  function startTalking() {
    // hvis hun allerede “snakker”, så start ikke en ny interval
    if (talkInterval) return;

    let open = true;
    havfrueSnak(true); // start med åben mund

    // Skifter mellem åben/lukket mund hvert 150 ms
    talkInterval = setInterval(() => {
      open = !open;
      havfrueSnak(open);
    }, 150);
  }

  function stopTalking() {
    // stopper mund-animationen
    if (talkInterval) {
      clearInterval(talkInterval);
      talkInterval = null;
    }
    havfrueSnak(false); // slut med lukket mund
  }

  // Start med lukket mund når siden loader
  havfrueSnak(false);

  /* ------------------------------------------
     Fiske-array med info om hvilken taleboble
     der hører til hvilken fisk/krabbe
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
     - én lyd per fisk + CTA + blob “plop”-lyd
     - soundAngel bruges til kisten
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

  // Samler alle “tale-lyde” i et array, så jeg nemt kan stoppe dem alle
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

  // Stopper alle fiskelyde + stopper mund-animation
  function stopFiskLyde() {
    fiskLyde.forEach((lyd) => {
      lyd.pause();
      lyd.currentTime = 0;
    });
    stopTalking();
  }

  /* ------------------------------------------
     Spil blob + tale-lyd + mund
     - spiller først en lille "blob"-lyd
     - derefter selve tale-lyden
     - hvis det ikke er engle-lyden, starter mund-animation
  --------------------------------------------- */
  function spilLyde(taleLyd) {
    if (!taleLyd) return;

    // Stop andre lyde før ny lyd
    stopFiskLyde();
    ctaLyd.pause();
    ctaLyd.currentTime = 0;

    // Lille “blob” før talelyd
    soundBlob.currentTime = 0;
    soundBlob.play();

    setTimeout(() => {
      taleLyd.currentTime = 0;

      // englelyden (soundAngel) skal ikke give mund-animation
      if (taleLyd !== soundAngel) {
        startTalking();
      }

      taleLyd.play();

      // når lyden er færdig, stopper vi mund-animation (med mindre det var englelyden)
      taleLyd.onended = () => {
        if (taleLyd !== soundAngel) {
          stopTalking();
        }
      };
    }, 300); // lille delay så blob-lyden når at spille først
  }

  /* ------------------------------------------
     Klik på fisk = vis taleboble
     - klik på en fisk → viser taleboblen med
       det billede der passer til fisken
     - klik igen på samme → lukker boblen
  --------------------------------------------- */
  fisk.forEach(function (fiskObjekt) {
    const element = document.getElementsByClassName(fiskObjekt.klasse)[0];

    if (element) {
      element.addEventListener("click", function (event) {
        event.stopPropagation(); // så klikket ikke tæller som “klik udenfor”

        if (cta) cta.style.display = "none"; // gem CTA når barn vælger fisk

        // stop CTA-lyd hvis den spiller
        ctaLyd.pause();
        ctaLyd.currentTime = 0;

        // hvis boblen allerede viser samme billede → luk den
        if (
          boble.style.display === "block" &&
          bobleBillede.src.includes(fiskObjekt.billede)
        ) {
          boble.style.display = "none";
          stopTalking();
          if (cta) cta.style.display = "block";
        } else {
          // ellers vis boblen med ny fisk-tekst
          bobleBillede.src = fiskObjekt.billede;
          boble.style.display = "block";
          // mundanimationen styres af lyden, ikke her
        }
      });
    }
  });

  /* ------------------------------------------
     Klik udenfor fiskeområder:
     - luk taleboble
     - stop fiskelyde
     - vis CTA igen
     - spil CTA-lyd med mundanimation
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

      // stop alt der "snakker"
      stopFiskLyde();

      if (cta) cta.style.display = "block";

      // havfruen siger CTA-teksten
      ctaLyd.currentTime = 0;
      startTalking();
      ctaLyd.play();

      ctaLyd.onended = () => {
        stopTalking();
      };
    }
  });

  /* ------------------------------------------
     Klik på fisk = spil lyd (kobler HTML-id'er
     til de rigtige lydfiler via spilLyde)
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
     - klik på lukket kiste → åben kiste + engle-lyd
     - klik på åben kiste → luk kiste + stop lyde
     - englelyden bruger stadig spilLyde(), men munden
       animerer ikke pga. check i spilLyde()
  --------------------------------------------- */
  if (lukketKiste && aabenKiste) {
    lukketKiste.style.display = "block";
    aabenKiste.style.display = "none";

    // Når kisten åbnes
    lukketKiste.addEventListener("click", () => {
      spilLyde(soundAngel); // mund animerer ikke, pga. special-case i spilLyde()
      lukketKiste.style.display = "none";
      aabenKiste.style.display = "block";
    });

    // Når kisten lukkes igen
    aabenKiste.addEventListener("click", () => {
      aabenKiste.style.display = "none";
      lukketKiste.style.display = "block";
      stopFiskLyde(); // stop evt. englelyd eller andre lyde
    });
  }
});

hej;
