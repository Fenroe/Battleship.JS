const pageElements = (() => {
  // components shared by both boards
  const boardTile = '<div class="board-tile" data-index="" data-has-boat="" data-targeted="no"></div>'

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
    getHeader,
    getMain
  }
})()