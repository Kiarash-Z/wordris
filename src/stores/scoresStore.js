import { decorate, observable, action, computed } from 'mobx';

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
        duration
      }
    ];

    // .slice for transforming MobX array intor normal JavaScript array
    localStorage.setItem('scores', JSON.stringify(this.scores.slice()));
  }

  get highestStar() {
    const stars = this.scores.map(score => score.stars);
    const highestStar = Math.max(...stars);
    return highestStar;
  }

  get scoresCount() {
    return this.scores.length;
  }

  get averageDuration() {
    const sum = this.scores
      .map(s => s.duration)
      .reduce((prev, cur) => prev + cur, 0);
    const count = this.scores.length;
    const average = sum / count;

    let minutes = Math.floor(average / 60);
    let seconds = Math.floor(average - minutes * 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
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
