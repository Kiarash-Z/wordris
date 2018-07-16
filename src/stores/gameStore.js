import { decorate, observable, action } from 'mobx';
import { MAIN_POINT, SUB_POINT } from '../constants/boardConstants';

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
  words = [
    new Word({ text: 'راه', count: 0 }),
    new Word({ text: 'خوب', count: 0 }),
    new Word({ text: 'کیا', isMain: true, count: 0 })
  ];
  score = 0;

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
}

decorate(GameStore, {
  nextLetter: observable,
  score: observable,

  updateNextLetter: action.bound,
  handleWordsMatch: action.bound,
  addToScore: action.bound
});

const gameStore = new GameStore();

export { gameStore };
