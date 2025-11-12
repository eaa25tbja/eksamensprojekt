"use strict";

/* Grabs */
const game = document.getElementById("game");
const dodger = document.getElementById("dodger");
const movementSound = document.getElementById("movementSound");
const gameoverSound = document.getElementById("gameoverSound");

/* Audio: kræver typisk 1. bruger-interaktion før afspilning */
let audioUnlocked = false;
window.addEventListener("keydown", () => (audioUnlocked = true), {
  once: true,
});

/* Hjælpere */
const STEP = 8;

function maxX() {
  return game.clientWidth - dodger.offsetWidth; // højre grænse
}
function maxY() {
  return game.clientHeight - dodger.offsetHeight; // øvre grænse (målt som bottom)
}
function leftPx() {
  return parseInt(dodger.style.left?.replace("px", "") || "0", 10);
}
function bottomPx() {
  return parseInt(dodger.style.bottom?.replace("px", "") || "0", 10);
}
function setLeft(px) {
  dodger.style.left = `${px}px`;
}
function setBottom(px) {
  dodger.style.bottom = `${px}px`;
}

/* Init: centrer vandret i #game */
function initDodger() {
  // Fjern evt. inline transform fra CSS-centrering og sæt præcis px
  dodger.style.transform = "none";
  const centerX = (game.clientWidth - dodger.offsetWidth) / 2;
  setLeft(centerX);
  setBottom(20);
}
window.addEventListener("load", initDodger);
window.addEventListener("resize", initDodger);

/* Bevægelse */
function playMove() {
  if (!audioUnlocked) return;
  try {
    movementSound.currentTime = 0;
    movementSound.play();
  } catch {}
}
function playGameover() {
  if (!audioUnlocked) return;
  try {
    movementSound.pause();
    movementSound.currentTime = 0;
    gameoverSound.currentTime = 0;
    gameoverSound.play();
  } catch {}
}

function moveDodgerLeft() {
  const x = leftPx();
  if (x > 0) setLeft(Math.max(0, x - STEP));
  else playGameover();
}
function moveDodgerRight() {
  const x = leftPx();
  if (x < maxX()) setLeft(Math.min(maxX(), x + STEP));
  else playGameover();
}
function moveDodgerUp() {
  const y = bottomPx();
  if (y < maxY()) setBottom(Math.min(maxY(), y + STEP));
  else playGameover();
}
function moveDodgerDown() {
  const y = bottomPx();
  if (y > 0) setBottom(Math.max(0, y - STEP));
  else playGameover();
}

/* Controls */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    moveDodgerLeft();
    playMove();
    dodger.style.transform = "scaleX(1)";
  }
  if (e.key === "ArrowRight") {
    moveDodgerRight();
    playMove();
    dodger.style.transform = "scaleX(-1)";
  }
  if (e.key === "ArrowUp") {
    moveDodgerUp();
    playMove();
  }
  if (e.key === "ArrowDown") {
    moveDodgerDown();
    playMove();
  }
});
