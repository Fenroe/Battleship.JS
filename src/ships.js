const ships = (length) => {
  function getLength() {
    return length;
  }

  let segments = [];

  function makeSegments() {
    let array = [];
    for(let i = 0; i < length; i += 1) {
      array.push(false);
    }
    segments = array;
  }

  function getSegments() {
    return segments;
  }

  function isHit(index) {
    segments[index] = true;
  }

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