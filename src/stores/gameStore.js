import { decorate, observable, action } from 'mobx';

class GameStore {
  nextLetter = {};

  updateNextLetter(letter) {
    this.nextLetter = letter;
  }
}

decorate(GameStore, {
  nextLetter: observable,
  updateNextLetter: action.bound
});

const gameStore = new GameStore();

export { gameStore };
