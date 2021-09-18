// Ideas to return to later, if ever

// Function to generate the coordinates between the first and last coordinate based on the ship's length
function fillCoordinates(firstCoordinate, lastCoordinate, shipLength, callback) {
  if(typeof callback === 'function') {
    return callback(firstCoordinate, lastCoordinate);
  } else {
    let coordinatesArray = [];
    coordinatesArray.push(firstCoordinate);
    let first = firstCoordinate.split('');
    let last = secondCoordinate.split('');
    if(first[0] === last[0]) {
      // letters match so numbers are affected
      for(let i = 1; i <= shipLength-2; i+=1) {
        let nextCoordinate = '';
        if(first[1] > last[1]) {
          nextCoordinate = `${first[0]}${first[1]+i}`;      
        } else {
          nextCoordinate = `${first[0]}${first[1]-i}`;
        }
        coordinatesArray.push(nextCoordinate);
      }
    } else {
      // numbers match so letters are affected
      let firstIndex = upper.indexOf(first[0]);
      let lastIndex = upper.indexOf(last[0]);
      for(let i = 1; i <= shipLength-2; i+=1) {
        if(firstIndex > lastIndex) {
          nextCoordinate = `${upper[firstIndex+i]}${first[1]};`
        } else {
          nextCoordinate = `${upper[firstIndex-1]}${first[1]}`;
        }
        coordinatesArray.push(nextCoordinate);
      }
    } 
  }
}