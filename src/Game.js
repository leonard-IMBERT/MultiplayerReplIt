/* eslint-disable no-unused-vars */
const Player = require('./Player');
/* eslint-enable no-unused-vars */

const GameStatus = Object.freeze({
  Initialization: 0,
  WaitingForPlayer: 1,
  InGame: 2,
  Win: 3,
});

class Game {
  constructor() {
    this.players = [];
    this.gameStatus = GameStatus.Initialization;
    this.winner = undefined;
  }

  setup() {
    this.gameStatus = GameStatus.WaitingForPlayer;
  }

  /**
   * Add a player to the Game
   * @param {Player} player The player to add
   */
  addPlayer(player) {
    if (this.gameStatus !== GameStatus.WaitingForPlayer) throw new Error('Cannot add player for the moment');
    this.players.push(player);
  }

  /**
   * Remove a player from the game
   * @param {string} id The player id
   * @returns {Player} The player who leaved
   */
  removePlayer(id) {
    const index = this.players.findIndex(p => p.id === id);
    let player;
    if (index !== undefined) player = this.players.splice(index, 1);
    if (this.players.length <= 1) {
      this.winner = this.players.pop();
      this.gameStatus = GameStatus.Win;
    }

    return player[0];
  }
}

module.exports = Game;
