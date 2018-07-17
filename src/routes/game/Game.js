import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './Game.css';
import Board from './components/board';
import Words from './components/words';
import GameNav from './components/gameNav';
import Powerups from './components/Powerups';
import PauseMenu from './components/pauseMenu';

class Game extends Component {
  componentDidMount() {
    this.props.gameStore.initialize();
  }
  render() {
    const { gameStore } = this.props;
    return (
      <div class={styles.gamePage}>
        <PauseMenu />
        <GameNav />
        <div class={styles.gameMainWrapper}>
          <div class={styles.score}>
            <i class={`a-star ${styles.score__icon}`} />
            <span class={styles.score__text}>{gameStore.score}</span>
          </div>
          <Powerups />
          <Board />
          <Words />
        </div>
      </div>
    );
  }
}

export default inject('gameStore')(observer(Game));
