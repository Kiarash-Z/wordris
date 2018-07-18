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
}

decorate(ScoresStore, {
  scores: observable,

  getScores: action.bound,
  saveNewScore: action.bound,

  highestStar: computed
});

const scoresStore = new ScoresStore();

export { scoresStore };
