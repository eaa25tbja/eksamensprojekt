a
--------------------- HTML --------------------------
/////////////////index.html////////////////////// - ny index-fil, som åbner havfrue.html automatisk

    /////////////////havfrue.html//////////////////////
    Struktur & head

        - Opdateret title
        - Stylesheet-link rettet
        - filstier rettet udfra optimeret mappestruktur

    Scene & baggrund

        - Før:
            - <section class="scene">
                - Én <div class="bg"> der indeholdt koraller, kiste, havfrue, fisk osv.
        - Nu:
            - <section class="scene">
                - To separate lag til baggrund:
                    - <div class="bg bg1"></div>
                    - <div class="bg bg2"></div>
                - Resten af indholdet (kiste, havfrue, fisk osv.) ligger direkte i <section> i stedet for inde i .bg.
        - Koraller fjernet

    Havfrue & mund-billeder

        - Klassenavnet til åben mund er rettet fra .havfrue-åben til .havfrue-open

    CTA & taleboble

            - Ny CTA
            - src på taleboblen sættes nu dynamisk via JS (starter tom)

    Fisk & krabbe

        - Id’er tilpasset så de matcher arter (klovnefisk, palet-kirurg, gul-kirurg, osv.).
        - Ny krabbe-struktur med yderdiv (.krabbe) + inner-billede (.krabbe-inner).


    ///////////////////spil.html///////////////////////

    Struktur & head

        - Opdateret title
        - h1 rettet til "spil slut"
        - Stylesheet-link rettet
        - filstier rettet udfra optimeret mappestruktur
        - score: <b>-tag fjernet omkring teksten (styling foregår nu i CSS).

--------------------- CSS ---------------------------

    ///////////////////havfrue.css//////////////////////

    Struktur & variabler

        - Opdateret :root-variabler:
            - Ændret --fish-w fra 200px → 160px (mindre fisk generelt).
            - Beholdt --off-fish1–6 til styring af startposition for fisk.
        - Tilføjet html, body { height: 100%; } for mere stabil full-screen layout.
        - Ryddet op i kommentar-struktur og sektioner (Baggrund, Kiste, Talebobler, Havfrue, Fisk, Krabbe, GameBtn).

    Baggrund / scene

        - Scene:
            - Ændret .scene fra height: 100vh → min-height: 100vh.
            - Tilføjet width: 100% og overflow: hidden; for bedre skalering.
        - Baggrund:
            - Tidligere én .bg med ../pacman-img/baggrund.png.
            - Nu to lag:
                - .bg1 med ../img/baggrund/baggrund1-havfrue.png.
                - .bg2 med ../img/baggrund/baggrund2-havfrue.png + fadeBg-animation (opacity 0 → 1 → 0).

    Kiste (lukket/åben)

        - Animation:
            - Tilføjet kiste-anim keyframes til .kiste1 (lille hop op/ned).
            - Tilføjet transform-origin: bottom center for naturlig hop-effekt.

    Søstjerne
        - .starfish:
            - Tilføjet star-wobble keyframes (lille rotation og scale-animation).

    Generelt
        - Justeret på animation duration ved flere fisk
        - Position, størrelse og z-index rettet på:
            - CTA og talebobler
            - Havfrue
            - Søstjerne

    Krabbe
        - Ny .krabbe:
            - animation: krabbe-walk
        - Ny .krabbe-inner:
            - animation: krabbe-rotate

///////////////////spil.css//////////////////////

    Struktur & setup

        - Tilføjet ny font-import: "Baloo 2" fra Google Fonts.

    Spilscene (#game)

        - Skiftet baggrundsbillede til: ../img/baggrund/baggrund-pacman.png (før: ../pacman-img/baggrund.png).

    Pacman / dodger (#dodger)

        - Opdateret billed-stier:
            - Åben mund: ../img/pacman-img/pacman-aaben.png
            - Lukket mund: ../img/pacman-img/pacman-luk.png
        - Justeret nomnom-animation:
            - Duration ændret fra 0.3s → 0.4s

    Knap-container & controls

        - .controls:
            - Ændret størrelse fra width: 200px; height: 120px → width: 300px; height: 150px.
            - Tilføjet z-index: 60.
        - .ctrl-btn:
            - Ændret størrelse fra 70x70px → 100x90px.
            - Tilføjet border: orangered.

    Score (#score)

        - Skiftet font

    Fiskemad (.food)

        - Tilføjet scale-animation:
            - .food har nu animation: scale 1s ease infinite

    Fjendefisk (.enemy)

        - Skiftet billede:
            - Før: ../pacman-img/fishdevil.png
            - Nu: ../img/pacman-img/ond-fisk-aaben.png / ond-fisk-lukket.png.
        - Tilføjet ond-nomnom-animation

    Game over overlay

        - .game-over:
            - Farve ændret fra red → orangered.
            - Font skiftet til "Baloo 2", sans-serif.
        - .game-over h1:
            - font-size øget fra 3rem → 7rem.
        - .game-over p:
            - font-size øget fra 1.5rem → 3rem.
            - Tilføjet margin-top: -2vh og margin-bottom: 1%.
        - #restartBtn:
            - font-size øget (ca. 1.2rem → 2rem).
            - Tilføjet color: orangered og font-weight: bolder.
            - Tilføjet font-family: "Baloo 2", sans-serif.
        - .dine-point:
            - Tilføjet font-weight: bolder og font-family: "Baloo 2", sans-serif.

------------------ JavaScript -----------------------

    ///////////////////havfrue.js//////////////////////

    Struktur & setup

        - Lagt hele scriptet ind i document.addEventListener("DOMContentLoaded", ...).
        - Hentet centrale DOM-elementer i toppen: .havfrue-open, .havfrue-lukket, .taleboble, #taleboble-billede, #lukketkiste, #abenkiste, .cta, #bgMusic m.fl.
        - Initialiseret havfruen til at starte med lukket mund via havfrueSnak(false).

    Mundanimation

        - Oprettet funktionen havfrueSnak(isOpen) til at styre visning af .havfrue-open og .havfrue-lukket.
        - Oprettet variablen talkInterval til at gemme interval-id.
        - Oprettet startTalking() som starter et setInterval, der skifter mellem åben/lukket mund ved at kalde havfrueSnak(...).
        - Oprettet stopTalking() som stopper intervallet (clearInterval) og sætter munden tilbage til lukket med havfrueSnak(false).

    Lydsystem

        - Rettet og oprettet flere lyd-objekter: krabbeLyd, ctaLyd.
        - Samlet talelyde i arrayet fiskLyde.
        - Oprettet stopFiskLyde() som looper over fiskLyde, kalder .pause() og nulstiller currentTime, og stopper mundanimation med stopTalking().
        - Oprettet spilLyde(taleLyd) som:
            - kalder stopFiskLyde() og nulstiller ctaLyd, afspiller soundBlob,
            - efter et timeout starter talelyden, evt. mundanimation med startTalking(), og stopper igen med stopTalking() i taleLyd.onended.
        - Tilføjet special-case i spilLyde(), så soundAngel ikke starter mundanimation.

    Baggrundsmusik

        - bgMusic currentTime = 0 og volume = 0.2.
        - Forsøgt autoplay med bgMusic.play().catch(...).
        - Oprettet en document.addEventListener("click", startMusic)-listener, der ved første klik starter bgMusic og derefter fjerner sig selv.

    Fisk, talebobler & klik

        - Oprettet konfigurationsarrayet fisk med { klasse: "...", billede: "..." } for hver fisk/krabbe.
            - Loopet over fisk og lagt click-event på hvert element (via getElementsByClassName(...)[0]), der:
                - event.stopPropagation() for at undgå at trigge “klik udenfor”-logikken.
                - skjuler .cta hvis den findes.
                - stopper ctaLyd.
                -  tjekker om taleboblen allerede viser samme billede:
                        - hvis ja → skjuler .taleboble, stopper munden og viser .cta igen,
                        - hvis nej → opdaterer bobleBillede.src og viser .taleboble.


    Klik udenfor (luk alt / CTA)

        - Lagt en global document.addEventListener("click", ...) der:
            - med event.target.closest(...) tjekker, om klikket ikke rammer .fish, .taleboble, .krabbe, #lukketkiste eller #abenkiste.
        - hvis det er et “klik udenfor”:
            - skjuler .taleboble,
            - kalder stopFiskLyde(),
            - viser .cta igen,
            - afspiller ctaLyd og starter mundanimation med startTalking() mens CTA-lyden kører, og stopper med stopTalking() når lyden slutter.

    Kiste (lukket/åben)

    - Sat lukketKiste.style.display = "block" og aabenKiste.style.display = "none" ved start.
    - Lagt click-event på lukketKiste, der:
        - kalder spilLyde(soundAngel),
        - sætter lukketKiste til display: none,
        - sætter aabenKiste til display: block.
    - Lagt click-event på aabenKiste, der:
        - skjuler aabenKiste,
        - viser lukketKiste,
        - kalder stopFiskLyde() for at stoppe lyd.

    ///////////////////pacman.js//////////////////////

    Struktur & setup

        - Tilføjet tydelige sektion-kommentarer, så det er nemmere at finde rundt i.
        - Justeret bgMusic.play() til at bruge .catch(...).

    Mad, fjende & kollision

        - checkCollisions() udvidet til også at:
            - afspille en point-lyd via playSoundWhenPoint(), når dodger rammer et mad-element - anvendt gamle movementsound

    Lydsystem

        - Fjernet movementSound og funktionen playSoundOnMovement().
        - Oprettet nyt lyd-setup til point:
            - const pointSound = document.getElementById("pointSound").
            - funktionen playSoundWhenPoint() nulstiller currentTime og afspiller pointSound.
        - Justeret game over-lyd:
            - const gameoverSound = document.getElementById("gameoverSound").
            - playGameoverSound() nulstiller nu currentTime før afspilning, så lyden starter fra begyndelsen hver gang.
        - Integreret playSoundWhenPoint() i checkCollisions(), så point-lyden kun afspilles ved mad-kollision.
