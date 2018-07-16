import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import Board from './components/Board';
import styles from './Game.css';

class Game extends Component {
  render() {
    const { gameStore } = this.props;
    return (
      <div class={styles.gamePage}>
        <div class={styles.score}>
          <i class={`icons icon-star ${styles.score__icon}`} />
          <span class={styles.score__text}>{gameStore.score}</span>
        </div>
        <Board />
      </div>
    );
  }
}

export default inject('gameStore')(observer(Game));
