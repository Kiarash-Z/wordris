import { decorate, observable, action, computed } from 'mobx';

import {
  createBoard,
  clearBoard,
  toggleGamePause
} from '../routes/game/board/board';
import {
  MAIN_POINT,
  SUB_POINT,
  EARTHQUAKES_COUNT
} from '../constants/gameConstants';
import GameoverMenu from '../routes/game/components/gameoverMenu/GameoverMenu';

class Word {
  text = '';
  count = 0;
  isMain = false;
  constructor({ text, count, isMain }) {
    this.text = text;
    this.count = count;
    this.isMain = !!isMain;
  }
}
decorate(Word, { text: observable, count: observable, isMain: observable });

class GameStore {
  nextLetter = {};
  score = 0;
  timer = null;
  time = 0;
  earthquakesLeft = EARTHQUAKES_COUNT;
  words = [
    new Word({ text: 'راه', count: 0 }),
    new Word({ text: 'خوب', count: 0 }),
    new Word({ text: 'کیا', isMain: true, count: 0 })
  ];

  resetValues() {
    this.time = 0;
    this.earthquakesLeft = EARTHQUAKES_COUNT;
    this.words = [
      new Word({ text: 'راه', count: 0 }),
      new Word({ text: 'خوب', count: 0 }),
      new Word({ text: 'کیا', isMain: true, count: 0 })
    ];
    this.nextLetter = {};
    this.score = 0;
    this.timer = null;
  }

  initialize() {
    this.resetValues();
    const words = this.words.map(w => w.text);
    createBoard(words);
    this.timer = setInterval(this.increaseTime, 1000);
  }

  increaseTime() {
    this.time++;
  }

  updateNextLetter(letter) {
    this.nextLetter = letter;
  }

  addToScore(increment) {
    this.score += increment;
  }

  handleWordsMatch(matchedWords) {
    matchedWords.forEach(matchedWord => {
      const foundWord = this.words.find(word => word.text === matchedWord);
      const point = foundWord.isMain ? MAIN_POINT : SUB_POINT;
      foundWord.count++;
      this.addToScore(point);
    });
  }

  pauseGame() {
    clearInterval(this.timer);
    toggleGamePause(true);
  }

  resumeGame() {
    this.timer = setInterval(this.increaseTime, 1000);
    toggleGamePause(false);
  }

  // Gameover functions
  retry() {
    clearBoard();
    GameoverMenu.close();
    this.initialize();
  }

  handleGameover() {
    clearInterval(this.timer);
    GameoverMenu.open();
  }

  // Powerups
  decreaseEarthquake() {
    this.earthquakesLeft--;
  }

  get formattedTime() {
    let minutes = Math.floor(this.time / 60);
    let seconds = Math.floor(this.time - minutes * 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }
}

decorate(GameStore, {
  nextLetter: observable,
  score: observable,
  time: observable,
  earthquakesLeft: observable,

  initialize: action.bound,
  updateNextLetter: action.bound,
  handleWordsMatch: action.bound,
  addToScore: action.bound,
  increaseTime: action.bound,
  handleGameover: action.bound,
  decreaseEarthquake: action.bound,
  resetValues: action.bound,
  retry: action.bound,
  pauseGame: action.bound,
  resumeGame: action.bound,

  formattedTime: computed
});

const gameStore = new GameStore();

export { gameStore };
