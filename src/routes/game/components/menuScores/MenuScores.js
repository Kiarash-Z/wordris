import { h } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './MenuScores.css';

const MenuScores = ({ scoresStore, gameStore }) => (
  <div>
    <div class={styles.score}>
      <i class={`a-star ${styles.score__icon}`} />
      <span class={styles.score__text}>{gameStore.stars}</span>
    </div>
    <div class={styles.highestScore}>
      <i class={`a-crown ${styles.highestScore__icon}`} />
      <span class={styles.highestScore__text}>{scoresStore.highestStar}</span>
    </div>
  </div>
);

export default inject('scoresStore', 'gameStore')(observer(MenuScores));
