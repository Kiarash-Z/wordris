import { decorate, observable } from 'mobx';

class GameStore {
  nextLetter = '';
}

decorate(GameStore, {
  nextLetter: observable
});

const gameStore = new GameStore();

export { gameStore };
