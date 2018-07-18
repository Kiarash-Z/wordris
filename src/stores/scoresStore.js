import { decorate, observable, action, computed } from 'mobx';
import { formatTime } from '../utils';

class ScoresStore {
  scores = [];

  getScores() {
    const localStorageScores = JSON.parse(localStorage.getItem('scores'));

    if (!localStorageScores) localStorage.setItem('scores', JSON.stringify([]));
    else this.scores = localStorageScores;
  }

  saveNewScore({ stars, duration }) {
    this.scores = [
      ...this.scores,
      {
        stars,
        duration,
        id: new Date().getTime()
      }
    ];

    // .slice for transforming MobX array intor normal JavaScript array
    localStorage.setItem('scores', JSON.stringify(this.scores.slice()));
  }

  get highestStar() {
    const stars = this.scores.map(score => score.stars);
    if (!stars.length) return 0;
    const highestStar = Math.max(...stars);
    return highestStar;
  }

  get scoresCount() {
    return this.scores.length;
  }

  get averageDuration() {
    if (!this.scores.length) return '00:00';
    const sum = this.scores
      .map(s => s.duration)
      .reduce((prev, cur) => prev + cur, 0);
    const count = this.scores.length;
    const average = sum / count;
    return formatTime(average);
  }
}

decorate(ScoresStore, {
  scores: observable,

  getScores: action.bound,
  saveNewScore: action.bound,

  highestStar: computed,
  scoresCount: computed,
  averageDuration: computed
});

const scoresStore = new ScoresStore();

export { scoresStore };
