const ships = (length) => {
  // check ship length
  function getLength() {
    return length;
  }

  // manage segments
  let segments = [];

  function getSegments() {
    return segments;
  }

  function makeSegments() {
    let array = [];
    for(let i = 0; i < length; i += 1) {
      array.push(false);
    }
    segments = array;
  }

  // register hit
  function isHit(index) {
    segments[index] = true;
  }

  // check if sunk
  function isSunk() {
    if (getSegments().includes(false)) {
      return false;
    } else {
      return true;
    }
  }

  // on init 
  makeSegments();

  return {
    getLength,
    getSegments,
    isHit,
    isSunk,
  }
}

export default ships;