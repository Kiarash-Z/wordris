import { decorate, observable, action, computed } from 'mobx';

class ScoresStore {
  scores = [{ stars: 548 }];

  get highestStar() {
    const stars = this.scores.map(score => score.stars);
    const highestStar = Math.min(...stars);
    return highestStar;
  }
}

decorate(ScoresStore, {
  scores: observable,

  highestStar: computed
});

const scoresStore = new ScoresStore();

export { scoresStore };
