"use strict";

/* -----------------------------------------
   DOM ELEMENTER
-------------------------------------------- */
const game = document.getElementById("game"); // Hele spilområdet
const dodger = document.getElementById("dodger"); // Spilleren (pacman-fisken)

/* ------------------------------------------
   Score og Gameover
--------------------------------------------- */
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreElement = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

/* -----------------------------------------
   Baggrundsmusik
   - Spilles i loop og starter når spillet loader
-------------------------------------------- */
const bgMusic = document.getElementById("bgMusic");

/* ------------------------------------------
   SPIL-STATUS & VARIABLER
--------------------------------------------- */
let score = 0; // Holder styr på point
let isGameOver = false; // Bruges til at stoppe spillet når man taber
let foods = []; // Array med alle mad-elementer
let enemy = null; // Henvisning til fjende-elementet

/* -------------------------------------------
   INITIALISERING VED LOAD
   - Placerer spilleren i midten
   - Spawner første batch mad
   - Spawner fjenden
   - Starter baggrundsmusik
---------------------------------------------- */
window.addEventListener("load", () => {
  // Placerer spilleren i midten af game-containeren
  const centerX = (game.clientWidth - dodger.offsetWidth) / 2;
  const centerY = (game.clientHeight - dodger.offsetHeight) / 2;
  dodger.style.left = centerX + "px";
  dodger.style.bottom = centerY + "px";

  // Spawn mad og fjende
  spawnNewFoodBatch();
  createEnemy();

  // Start musik (uden autoplay-fallback – her forventes user interaktion allerede)
  bgMusic.volume = 0.2;
  bgMusic.play().catch(() => {});
});

// Hvor mange pixels fisken flytter sig pr. tryk
const step = 15;

// Maks grænser så spilleren ikke kan bevæge sig udenfor spilområdet
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

// Generel kollisionstjek mellem to elementer
// Bruges både til mad + fjende
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
      score++; // +1 point
      updateScore(); // opdater ui
      foodEl.remove(); // fjern mad visuelt
      playSoundWhenPoint();
      return false; // fjerner elementet fra foods-arrayet
    }
    return true;
  });

  // Hvis der ikke er mad tilbage → spawn nyt batch
  if (foods.length === 0) {
    spawnNewFoodBatch();
  }

  // Tjek kollision med fjenden – ét hit → game over
  if (enemy && isColliding(dodger, enemy)) {
    triggerGameOver();
  }
}

/* ------------------------------------------
   Mad & fjendefisk
--------------------------------------------- */

// Opretter ét mad-element og tilføjer det til DOM + foods-arrayet
function spawnFood(x, y) {
  const food = document.createElement("div");
  food.classList.add("food");
  food.style.left = x + "px";
  food.style.bottom = y + "px";
  game.appendChild(food);
  foods.push(food);
}

// Spawner et nyt batch mad på tilfældige positioner
function spawnNewFoodBatch() {
  foods = []; // reset array, tidligere mad er allerede fjernet i DOM

  for (let i = 0; i < 4; i++) {
    const x = Math.random() * (game.clientWidth - 50);
    const y = Math.random() * (game.clientHeight - 50);
    spawnFood(x, y);
  }
}

// Bruges mest til test – specificerede positioner
function spawnFoodItems() {
  spawnFood(100, 150);
  spawnFood(400, 250);
  spawnFood(700, 180);
  spawnFood(300, 400);

  console.log("Foods:", foods);
}

// Opretter fjenden og starter random movement
function createEnemy() {
  enemy = document.createElement("div");
  enemy.classList.add("enemy");

  // Starter omtrent midt i området
  enemy.style.left = "60%";
  enemy.style.bottom = "60%";

  game.appendChild(enemy);

  moveEnemyRandom(); // starter loopet med random movement
}

/* ------------------------------------------
   Enemy RANDOM MOVEMENT
   - Fjenden hopper kontinuerligt til random positioner
   - Overgangen styres af CSS transition
--------------------------------------------- */

function moveEnemyRandom() {
  if (!enemy || isGameOver) return;

  // Vælg et random sted inden for game-området
  const maxX = game.clientWidth - enemy.offsetWidth;
  const maxY = game.clientHeight - enemy.offsetHeight;

  const targetX = Math.random() * maxX;
  const targetY = Math.random() * maxY;

  // Hvor lang tid skal bevægelsen tage?
  const duration = 2000 + Math.random() * 2000; // mellem 2–4 sekunder

  enemy.style.transition = `left ${duration}ms linear, bottom ${duration}ms linear`;

  enemy.style.left = targetX + "px";
  enemy.style.bottom = targetY + "px";

  // Når bevægelsen burde være færdig → kald funktionen igen
  // (simpelt loop i stedet for events)
  setTimeout(moveEnemyRandom, duration);
}

/* ------------------------------------------
   Game Over
   - Stopper spil-logik
   - Viser gameover overlay
--------------------------------------------- */

function triggerGameOver() {
  if (isGameOver) return;
  isGameOver = true;

  playGameoverSound();
  finalScoreElement.textContent = score;
  gameOverScreen.classList.add("show");
}

// Restart-knap: reload siden = reset spillet
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

/* ------------------------------------------
   Bevægelse – alle retninger
   - Hver funktion:
     * stopper hvis game over
     * henter nuværende position
     * tjekker om vi er ved kanten
     * flytter fisken
     * tjekker kollision
     * går udenfor → game over
--------------------------------------------- */

function moveDodgerLeft() {
  if (isGameOver) return;

  const left = parseInt(dodger.style.left) || 0;

  if (left > 0) {
    dodger.style.left = left - step + "px";
    checkCollisions();
  } else {
    // Går man uden for venstre kant → game over
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
    // Går man udenfor højre kant → game over
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
    // Går man udenfor topkant → game over
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
    // Går man udenfor bund → game over
    triggerGameOver();
  }
}

/* ------------------------------------------
   Tastaturstyring (piletaster)
   - Arrow keys kalder de samme bevægelsesfunktioner
   - scaleX bruges til at flippe fisken, så den “kigger” i retningen
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
   Lyd ved point og game over
--------------------------------------------- */
const pointSound = document.getElementById("pointSound");
function playSoundWhenPoint() {
  pointSound.currentTime = 0; // start fra start hver gang
  pointSound.play();
}

const gameoverSound = document.getElementById("gameoverSound");
function playGameoverSound() {
  gameoverSound.currentTime = 0;
  gameoverSound.play();
}

/* ------------------------------------------
   Knapper på skærmen (til touch)
   - Simpel version: ét klik = én bevægelse
   - Genbruger de samme move-funktioner
--------------------------------------------- */
const btnUp = document.getElementById("btnUp");
const btnDown = document.getElementById("btnDown");
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");

if (btnLeft)
  btnLeft.addEventListener("click", () => {
    moveDodgerLeft();
    dodger.style.transform = "scaleX(1)";
  });

if (btnRight)
  btnRight.addEventListener("click", () => {
    moveDodgerRight();
    dodger.style.transform = "scaleX(-1)";
  });

if (btnUp)
  btnUp.addEventListener("click", () => {
    moveDodgerUp();
  });

if (btnDown)
  btnDown.addEventListener("click", () => {
    moveDodgerDown();
  });
