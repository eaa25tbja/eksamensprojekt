"use strict";

/* ==========================================
   DOM ELEMENTER
   (Henter elementer fra HTML)
============================================== */
const game = document.getElementById("game"); // Spilområde
const dodger = document.getElementById("dodger"); // Pacman-fisken

/* ==========================================
   SCORE & GAME OVER UI
============================================== */
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreElement = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

/* ==========================================
   LYD / AUDIO
============================================== */
const bgMusic = document.getElementById("bgMusic");

/* ==========================================
   SPIL-STATUS & VARIABLER
============================================== */
let score = 0;
let isGameOver = false;
let foods = []; // Mad-objekter
let enemy = null; // Fjenden

/* ==========================================
   INITIALISERING VED LOAD
============================================== */
window.addEventListener("load", () => {
  // Placerer spilleren i midten
  const centerX = (game.clientWidth - dodger.offsetWidth) / 2;
  const centerY = (game.clientHeight - dodger.offsetHeight) / 2;
  dodger.style.left = centerX + "px";
  dodger.style.bottom = centerY + "px";

  // Spawn mad og fjende
  spawnNewFoodBatch();
  createEnemy();

  // Start musik
  bgMusic.volume = 0.2;
  bgMusic.play();
});

// Hvor mange pixels fisken flytter sig hver gang man trykker
const step = 15;

// Regner ud hvor langt man må bevæge sig i hver retning
function maxX() {
  return game.clientWidth - dodger.offsetWidth;
}
function maxY() {
  return game.clientHeight - dodger.offsetHeight;
}

/* ------------------------------------------
   Hjælpefunktioner
--------------------------------------------- */

function updateScore() {
  scoreElement.textContent = "Point: " + score;
}

function isColliding(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

function checkCollisions() {
  if (isGameOver) return;

  // Tjek kollision med mad
  foods = foods.filter((foodEl) => {
    if (isColliding(dodger, foodEl)) {
      score++;
      updateScore();
      foodEl.remove();
      playSoundWhenPoint();
      return false;
    }
    return true;
  });

  // Hvis der ikke er mad tilbage → spawn nyt batch
  if (foods.length === 0) {
    spawnNewFoodBatch();
  }

  // Tjek kollision med fjenden
  if (enemy && isColliding(dodger, enemy)) {
    triggerGameOver();
  }
}

/* ------------------------------------------
   Mad & fjendefisk
--------------------------------------------- */

function spawnFood(x, y) {
  const food = document.createElement("div");
  food.classList.add("food");
  food.style.left = x + "px";
  food.style.bottom = y + "px";
  game.appendChild(food);
  foods.push(food);
}

function spawnNewFoodBatch() {
  foods = []; // reset array

  for (let i = 0; i < 4; i++) {
    const x = Math.random() * (game.clientWidth - 50);
    const y = Math.random() * (game.clientHeight - 50);
    spawnFood(x, y);
  }
}

function spawnFoodItems() {
  spawnFood(100, 150);
  spawnFood(400, 250);
  spawnFood(700, 180);
  spawnFood(300, 400);

  console.log("Foods:", foods);
}

function createEnemy() {
  enemy = document.createElement("div");
  enemy.classList.add("enemy");

  enemy.style.left = "60%";
  enemy.style.bottom = "60%";

  game.appendChild(enemy);

  moveEnemyRandom(); //
}

/* ------------------------------------------
   Enemy RANDOM MOVEMENT
--------------------------------------------- */

function moveEnemyRandom() {
  if (!enemy || isGameOver) return;

  // Vælg et random sted inden for game-området
  const maxX = game.clientWidth - enemy.offsetWidth;
  const maxY = game.clientHeight - enemy.offsetHeight;

  const targetX = Math.random() * maxX;
  const targetY = Math.random() * maxY;

  // Hvor lang tid skal bevægelsen tage?
  const duration = 2000 + Math.random() * 2000; // mellem 2-4 sekunder

  enemy.style.transition = `left ${duration}ms linear, bottom ${duration}ms linear`;

  enemy.style.left = targetX + "px";
  enemy.style.bottom = targetY + "px";

  // Når den er færdig → ny random movement
  setTimeout(moveEnemyRandom, duration);
}

/* ------------------------------------------
   Game Over
--------------------------------------------- */

function triggerGameOver() {
  if (isGameOver) return;
  isGameOver = true;

  playGameoverSound();
  finalScoreElement.textContent = score;
  gameOverScreen.classList.add("show");
}

// Restart-knap
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    // Easiest: reload siden
    window.location.reload();
  });
}

/* ------------------------------------------
   Alle bevægelsesfunktioner
--------------------------------------------- */

function moveDodgerLeft() {
  if (isGameOver) return;

  const left = parseInt(dodger.style.left) || 0;

  if (left > 0) {
    dodger.style.left = left - step + "px";
    checkCollisions();
  } else {
    triggerGameOver();
  }
}

function moveDodgerRight() {
  if (isGameOver) return;

  const left = parseInt(dodger.style.left) || 0;

  if (left < maxX()) {
    dodger.style.left = left + step + "px";
    checkCollisions();
  } else {
    triggerGameOver();
  }
}

function moveDodgerUp() {
  if (isGameOver) return;

  const bottom = parseInt(dodger.style.bottom) || 0;

  if (bottom < maxY()) {
    dodger.style.bottom = bottom + step + "px";
    checkCollisions();
  } else {
    triggerGameOver();
  }
}

function moveDodgerDown() {
  if (isGameOver) return;

  const bottom = parseInt(dodger.style.bottom) || 0;

  if (bottom > 0) {
    dodger.style.bottom = bottom - step + "px";
    checkCollisions();
  } else {
    triggerGameOver();
  }
}

/* ------------------------------------------
   Når man trykker på piletasterne
--------------------------------------------- */
document.addEventListener("keydown", function (e) {
  if (isGameOver) return;

  if (e.key === "ArrowLeft") {
    moveDodgerLeft();
    dodger.style.transform = "scaleX(1)";
  }

  if (e.key === "ArrowRight") {
    moveDodgerRight();
    dodger.style.transform = "scaleX(-1)";
  }

  if (e.key === "ArrowUp") {
    moveDodgerUp();
  }

  if (e.key === "ArrowDown") {
    moveDodgerDown();
  }
});

/* ------------------------------------------
   Lyd
--------------------------------------------- */
const pointSound = document.getElementById("pointSound");
function playSoundWhenPoint() {
  pointSound.currentTime = 0;
  pointSound.play();
}

const gameoverSound = document.getElementById("gameoverSound");
function playGameoverSound() {
  gameoverSound.currentTime = 0;
  gameoverSound.play();
}

/* ------------------------------------------
   Knapper på skærmen
--------------------------------------------- */
const btnUp = document.getElementById("btnUp");
const btnDown = document.getElementById("btnDown");
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");

if (btnLeft)
  btnLeft.addEventListener("click", () => {
    moveDodgerLeft();
    dodger.style.transform = "scaleX(1)";
    playSoundOnMovement();
  });
if (btnRight)
  btnRight.addEventListener("click", () => {
    moveDodgerRight();
    dodger.style.transform = "scaleX(-1)";
    playSoundOnMovement();
  });
if (btnUp)
  btnUp.addEventListener("click", () => {
    moveDodgerUp();
    playSoundOnMovement();
  });
if (btnDown)
  btnDown.addEventListener("click", () => {
    moveDodgerDown();
    playSoundOnMovement();
  });
