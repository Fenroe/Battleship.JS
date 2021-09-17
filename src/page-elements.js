import { upper } from '../node_modules/alphabet';

const pageElements = (() => {
  function createBoardTile(xIndex, yIndex, callback) {
    if (typeof callback === 'function') {
      return callback(xIndex, yIndex);
    } else {
      return `div class="board-tile" data-index="${xIndex+yIndex}" data-has-boats="no" data-targeted="no"></div>`
    }
  }

  function fillElement(callback) {
    let element = '';
    for (let i = 0; i <= 9; i += 1) {
      const letter = upper[i];
      for (let j = 1; j <= 10; j += 1) {
        const number = `${j}`;
        element += createBoardTile(letter, number, callback)
      }
    }
    return element;
  }

  function fillBoard() {
    board = `div class="board">${fillElement(createBoardTile())}</div>`;
    return board;
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