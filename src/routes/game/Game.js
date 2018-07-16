import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './Game.css';
import Board from './components/Board';
import Words from './components/Words';

class Game extends Component {
  render() {
    const { gameStore } = this.props;
    return (
      <div class={styles.gamePage}>
        <div class={styles.score}>
          <i class={`icons icon-star ${styles.score__icon}`} />
          <span class={styles.score__text}>{gameStore.score}</span>
        </div>
        <div class={styles.gameMainWrapper}>
          <Board />
          <Words />
        </div>
      </div>
    );
  }
}

export default inject('gameStore')(observer(Game));
