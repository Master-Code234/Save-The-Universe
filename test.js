class Ship {
  constructor(hull, firePower, accuracy, shipName) {
    this.hull = hull;
    this.firePower = firePower;
    this.accuracy = accuracy;
    this.shipName = shipName;
  }
}

class HumanShip extends Ship {
  constructor() {
    super(20, 2, 0.7, "USS Assembly");
  }
}
class AlienShip extends Ship {
  constructor() {
    super(
      Math.floor(Math.random() * 4) + 3,
      Math.floor(Math.random() * 3) + 2,
      (Math.floor(Math.random() * 3) + 6) / 10,
      "Alien Ship"
    );
  }
}
const playerShip = new HumanShip();

console.log(playerShip.firePower);

const alienShip = new AlienShip();

let aliens = [];

//   PUTTING VALUES IN THE DOM

const playerShipName = document.querySelector("#player-name");

playerShipName.textContent = playerShip.shipName;

const alienShipName = document.querySelector("#enemy-name");

alienShipName.textContent = alienShip.shipName;

const attackButton = document.querySelector("#attack");

const playerShipHull = document.querySelector("#hull");
const playerShipPower = document.querySelector("#fire-power");
const playerShipAccuracy = document.querySelector("#accuracy");

playerShipHull.textContent = "Hull :" + playerShip.hull;
playerShipPower.textContent = "fire Power :" + playerShip.firePower;
playerShipAccuracy.textContent = "accuracy :" + playerShip.accuracy;

const alienShipHull = document.querySelector("#alien-hull");
const alienShipFirePower = document.querySelector("#alien-fire-power");
const alienShipAccuracy = document.querySelector("#alien-accuracy");

alienShipHull.textContent = "Hull :" + alienShip.hull;
alienShipFirePower.textContent = "FirePower :" + alienShip.firePower;
alienShipAccuracy.textContent = "Accuracy  :" + alienShip.accuracy;


const attackBtn = document.querySelector("#attack");
const message = document.querySelector("#displayMsg");

// creating functions and calling them on button click

function attackOnClick() {
  // create message
  const h1El = document.createElement("h1");

  h1El.textContent = `The  ${playerShip.shipName}  is attacking the  ${alienShip.shipName}!`;

  message.appendChild(h1El);

  function resetPage() {
    window.location.reload();
  }

  function attackAlien() {
    let attack = (alienShip.hull -= playerShip.firePower);

    alienShipHull.textContent = attack;
  }
  attackAlien();

  function isAlienAlive() {
    if (alienShipHull > 0) {
      console.log("alien is alive");
    }

    if (alienShip.hull <= 0) {
      h1El.textContent = "The alien is dead";

      alienShipHull.textContent = "Defeated";

      setTimeout(resetPage, 3000);
    }
  }
  isAlienAlive();

  function isPlayerAlive() {
    if (playerShip > 0) {
      console.log("player is alive");
    }

    if (playerShip.hull <= 0) {
      h1El.textContent = "You died";

      playerShipHull.textContent = "Defeated";

      setTimeout(resetPage, 3000);
    }
  }
  isPlayerAlive();

  function alienAttackPlayer() {
    if (playerShip.hull > 0 && alienShip.hull > 0) {
      // Makes sure both players are alive
      let attack = (playerShip.hull -= alienShip.firePower);
      const createH2 = document.createElement("h2");

      createH2.textContent = `The ${alienShip.shipName} is Attacking the ${playerShip.shipName}`;

      displayMsg.appendChild(createH2);

      playerShipHull.textContent = attack;
    }
  }
  alienAttackPlayer();

  function determineWinner() {
    if (playerShip.hull > 0 && alienShip.hull <= 0) {
      const createH1 = document.createElement("h1");

      createH1.textContent = `${playerShip.shipName} is the winner`;

      displayMsg.appendChild(createH1);
    }

    if (alienShip.hull >= 0 && alienShip.hull <= 0) {
      createH1.textContent = `${alienShip.shipName} is the winner`;

      displayMsg.appendChild(createH1);
    }
  }
  determineWinner();

  function createNewAlien() {
    // could not get this part to work correctly

    for (let i = 0; i <= 6; i++) {
      const alienShip = new AlienShip();
      aliens.push(alienShip);
    }
    console.log(alienShip);
  }
  createNewAlien();
}

attackBtn.addEventListener("click", attackOnClick);
