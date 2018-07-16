import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './Game.css';
import Board from './components/Board';
import Words from './components/Words';
import GameNav from './components/GameNav';

class Game extends Component {
  componentDidMount() {
    this.props.gameStore.initialize();
  }
  render() {
    const { gameStore } = this.props;
    return (
      <div class={styles.gamePage}>
        <GameNav />
        <div class={styles.gameMainWrapper}>
          <div class={styles.score}>
            <i class={`a-star ${styles.score__icon}`} />
            <span class={styles.score__text}>{gameStore.score}</span>
          </div>
          <Board />
          <Words />
        </div>
      </div>
    );
  }
}

export default inject('gameStore')(observer(Game));
