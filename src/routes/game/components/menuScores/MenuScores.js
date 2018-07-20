import { h } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './MenuScores.css';

const MenuScores = ({ scoresStore, gameStore }) => (
  <div>
    <div class={styles.scoreWrapper}>
      {!gameStore.isMultiplayer ? null : (
        <div class={styles.scoreSubWrapper}>
          <div class={`${styles.score} ${styles['--opponent']}`}>
            <i class={`a-star ${styles.score__icon}`} />
            <span class={styles.score__text}>{gameStore.opponentStars}</span>
          </div>
          <span class={styles.scoreDivider}>/</span>
        </div>
      )}
      <div class={`${styles.score} ${styles['--user']}`}>
        <i class={`a-star ${styles.score__icon}`} />
        <span class={styles.score__text}>{gameStore.stars}</span>
      </div>
    </div>
    <div class={styles.highestScore}>
      <i class={`a-crown ${styles.highestScore__icon}`} />
      <span class={styles.highestScore__text}>{scoresStore.highestStar}</span>
    </div>
  </div>
);

export default inject('scoresStore', 'gameStore')(observer(MenuScores));
