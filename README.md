# Oversigt over ændringer

## Havfrue-skærmen (HTML, CSS, JS)

### HTML

- Ny index-fil der automatisk åbner havfrue.html.
- Opryddet head + opdaterede filstier.
- Baggrund opdelt i to lag (bg1 + bg2) i stedet for én samlet .bg.
- Alt indhold (havfrue, kiste, fisk, CTA, boble) ligger nu direkte i <section>.
- Koraller fjernet.
- Rettet classnavn for havfruens mund (havfrue-open).
- Ny CTA og taleboble styret dynamisk via JavaScript.
- Opdaterede id’er til fisk samt ny krabbe-struktur.

### CSS

- Opdaterede variabler og ryddet struktur.
- Scene skalerer bedre (min-height + overflow hidden).
- To baggrundslag med fade-animation.
- Kiste har ny hop-animation.
- Justeringer af størrelse, placering og z-index for havfrue, CTA, boble, fisk m.m.
- Ny krabbe-walk animation.

### JavaScript

- Hele scriptet lagt i DOMContentLoaded.
- Nyt system til mundanimation (startTalking/stopTalking).
- Opdateret lydsystem: fiskelyde, CTA-lyd, krabbe-lyd.
- Kliklogik reworked:
  - Klik på fisk → viser taleboble + spiller tilhørende lyd.
  - Klik udenfor → lukker boble, stopper lyd, viser CTA.
- CTA spiller egen lyd og aktiverer mundanimation.
- Ny og tydeligere åbn/luk-logik for kisten.

---

## Pacman-spillet (HTML, CSS, JS)

### HTML/CSS

- Opdaterede titler, font og filstier.
- Nyt baggrundsbillede.
- Større og tydeligere controls.
- Opdaterede pacman-billeder og justeret mund-animation.
- Ny fjendefisk med egen animation.
- Game over-skærmen redesignet (større tekst, ny styling).

### JavaScript

- Opryddet struktur og tydelige sektioner.
- Ny point-lyd ved kollision med mad.
- Game over-lyden nulstilles før afspilning.
- Fjernet gammel movement-lyd.
- checkCollisions() opdateret til korrekt afspilning af point-lyde.

---

## Kort opsummering

- Ryddet struktur i HTML, CSS og JS.
- Bedre performance og mere logiske filstier.
- Forbedret baggrund, animationer og lydsystem.
- Klarere kliklogik og mere intuitiv interaktion.
- Generel visuel opstramning og forbedret UX.
