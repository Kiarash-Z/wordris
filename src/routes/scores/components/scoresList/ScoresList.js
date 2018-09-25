import { h } from 'preact';

import styles from './ScoresList.css';
import { formatTime } from '../../../../utils';

const ScoresList = ({ scores }) => {
  const renderScores = () =>
    scores.map(
      (
        {
          duration,
          stars,
          isMultiplayer,
          opponentStars,
          isOpponentGameovered,
          id
        },
        index
      ) => {
        if (isMultiplayer) {
          return (
            <li class={styles.scoresList__item} key={id}>
              <span class={styles.scoresList__itemNumber}>{index + 1}-</span>
              <span
                class={`${styles.scoresList__multiplayerStatus} ${
                  isOpponentGameovered ? styles['--win'] : styles['--lose']
                }`}
              >
                {isOpponentGameovered ? 'برد:' : 'باخت:'}
              </span>
              در مدت
              <span class={styles.scoresList__itemDuration}>
                {formatTime(duration)}
              </span>
              با
              <span class={styles.scoresList__itemStars}>
                <i class="a-star" />
                {stars}
              </span>
              در مقابل
              <span class={styles.scoresList__itemStars}>
                <i class="a-star" />
                {opponentStars}
              </span>
            </li>
          );
        }
        return (
          <li class={styles.scoresList__item} key={id}>
            <span class={styles.scoresList__itemNumber}>{index + 1}-</span> در
            مدت
            <span class={styles.scoresList__itemDuration}>
              {formatTime(duration)}
            </span>
            تونستی
            <span class={styles.scoresList__itemStars}>
              <i class="a-star" />
              {stars}
            </span>
            بگیری
          </li>
        );
      }
    );
  return <ul class={styles.scoresList}>{renderScores()}</ul>;
};

export default ScoresList;
