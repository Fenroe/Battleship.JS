import { upper } from '../node_modules/alphabet';

const pageElements = (() => {
  // components shared by both boards

  function createBoardTile(xIndex, yIndex) {
    return `div class="board-tile" data-index="${xIndex+yIndex}" data-has-boats="no" data-targeted="no"></div>`
  }

  let innerBoard = '';

  function fillElement(callback) {
    let element = '';
    for (let i = 0; i <= 9; i += 1) {
      const letter = upper[i];
      for (let j = 1; j <= 10; j += 1) {
        const number = `${j}`;
        callback(letter, number);
      }
    }
    return element;
  }

  const gameBoard = `
  <div class="player-board"</div>
  <div class="opponent-board"</div>
  `

  const log = `
  div class="event-log"</div>
  `

  const main = `${gameBoard} ${log}`


  function getMain() {
    return main;
  }

  return {
    createBoardTile,
    fillElement,
  }
})()

export default pageElements;