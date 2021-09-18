import ships from "./ships";
import  upper from "../node_modules/alphabet"

const gameboard = () => {
  let boardTiles = [];

  function generateBoardTiles() {
    for (let i = 0; i <= 9; i += 1) {
      const letter = upper[i];
      for (let j = 1; j <= 10; j += 1) {
        const number = `${j}`;
        boardTiles.push(`${letter}${number}`);
      }
    }
  }

  let shipData = [
    {
      name: 'carrier',
      coordinates: [],
      token: null,
      sunk: false,
    },
    {
      name: 'battleship',
      coordinates: [],
      token: null,
      sunk: false,
    },
    {
      name: 'cruiser',
      coordinates: [],
      token: null,
      sunk: false,
    },
    {
      name: 'submarine',
      coordinates: [],
      token: null,
      sunk: false,
    },
    {
      name: 'destroyer',
      coordinates: [],
      token: null,
      sunk: false,
    }
  ];

  function filterShipData(shipName, callback) {
    if(typeof callback === 'function') {
      return callback(shipName);
    } else {
      const filteredShip = shipData.filter((ship) => {
        if(ship.name === shipName) {
          return ship;
        }
        // return the first element of the filtered array, which should also be the only element 
      })[0]
      return filteredShip;
    }
  }

  let coordinatesInUse = [];

  function getCoordinatesInUse() {
    return coordinatesInUse;
  }

  function addCoordinatesInUse(coordinates) {
    coordinates.forEach((coordinate) => {
      coordinatesInUse.push(coordinate);
    })
  }

  function clearCoordinatesInUse() {
    coordinatesInUse = [];
  }

  let missedShots = [];

  function getMissedShots() {
    return missedShots;
  }

  function getShipCoordinates(shipName, callback) {
    const ship = filterShipData(shipName, callback);
    return ship.coordinates;
  }

  function setShipData(shipName, coordinates, shipToken, callback) {
    const ship = filterShipData(shipName, callback);
    ship.coordinates = coordinates;
    ship.token = shipToken;
    addCoordinatesInUse(coordinates);
  }

  function checkShipToken(shipName) {
    const ship = filterShipData(shipName);
    return ship.token;
  }

  function checkContainer(coordinates, container) {
    let isValid = true;
    coordinates.forEach((coordinate) => {
      if(!container.includes(coordinate)) {
        isValid = false;
      }
    })
    return isValid;
  }

  function validateCoordinates(coordinates) {
    return checkContainer(coordinates, boardTiles)
  }

  function checkCoordinatesInUse(coordinates) {
    return checkContainer(coordinates, coordinatesInUse)
  }

  function compareCoordinatesToShip(coordinatesLength, shipLength) {
    if(coordinatesLength === shipLength) {
      return true;
    } else {
      return false;
    }
  }

  function areCoordinatesConsecutive(coordinatesIndexes, length, interval) {
    for(let i = 0; i < length - 1; i += 1) {
      if(coordinatesIndexes[i+1] !== (coordinatesIndexes[i]+interval)) {
        return false;
      }
    }
  }

  function checkCoordinateSequence(coordinates, shipLength) {
    let isValid = true;
    const counter = 10 - shipLength;
    const coordinatesIndexNumbers = coordinates.map(coordinate => boardTiles.indexOf(coordinate));
    if((coordinatesIndexNumbers[0] % 10) > counter) {
      isValid = false;
    }
    if(areCoordinatesConsecutive(coordinatesIndexNumbers, coordinatesIndexNumbers.length, 1) === false &&
    areCoordinatesConsecutive(coordinatesIndexNumbers, coordinatesIndexNumbers.length, 10) === false) {
      isValid = false;
    }
    return isValid;
  }

  function placeShip(shipName, shipLength, coordinates, callback) {
    if(!Array.isArray(coordinates)) {
      throw new Error('coordinates argument must be an array');
    }
    if(compareCoordinatesToShip(coordinates.length, shipLength) === false) {
      throw new Error('too few or too many coordinates for ship');
    }
    if(validateCoordinates(coordinates) === false) {
      throw new Error('one or more coordinates elements are invalid');
    }
    if(checkCoordinatesInUse(coordinates) === true) {
      throw new Error('one or more coordinates elements are in use');
    }
    if(checkCoordinateSequence(coordinates, shipLength) === false) {
      throw new Error('invalid coordinates sequence');
    }
    const ship = ships(shipLength);
    setShipData(shipName, coordinates, ship, callback);
  }

  function placeCarrier(coordinates, callback) {
    placeShip('carrier', 5, coordinates, callback);
  }

  function placeBattleship(coordinates, callback) {
    placeShip('battleship', 4, coordinates, callback);
  }

  function placeCruiser(coordinates, callback) {
    placeShip('cruiser', 3, coordinates, callback);
  }

  function placeSubmarine(coordinates, callback) {
    placeShip('submarine', 3, coordinates, callback);
  }

  function placeDestroyer(coordinates, callback) {
    placeShip('destroyer', 2, coordinates, callback);
  }

  function recievedAttack(coordinate) {
    if(!coordinatesInUse.includes(coordinate)) {
      return false;
    } else {
      shipData.forEach(ship => {
        if(ship.coordinates.includes(coordinate)) {
          let index = ship.coordinates.indexOf(coordinate);
          ship.token.isHit(index);
          if(ship.token.isSunk() === true) {
            ship.sunk = true;
          }
          return;
        }
      })
      return true;
    }
  }

  function sinkAllShips() {
    shipData.forEach((ship) => {
      ship.sunk = true;
    })
  }

  function shipsStillFloating() {
    let floatingShips = false;
    shipData.forEach((ship) => {
      if(!ship.sunk) {
        floatingShips = true;
      }
    })
    return floatingShips;
  }

  // on init
  generateBoardTiles();

  return {
    getMissedShots,
    checkShipToken,
    placeCarrier,
    placeBattleship,
    placeCruiser,
    placeSubmarine,
    placeDestroyer,
    getCoordinatesInUse,
    getShipCoordinates,
    clearCoordinatesInUse,
    recievedAttack,
    sinkAllShips,
    shipsStillFloating,
  }
}

export default gameboard;