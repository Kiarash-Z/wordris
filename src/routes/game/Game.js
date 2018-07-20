import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './Game.css';
import Board from './components/board';
import Words from './components/words';
import GameNav from './components/gameNav';
import Powerups from './components/Powerups';
import PauseMenu from './components/pauseMenu';
import GameoverMenu from './components/gameoverMenu';
import socket from '../../socket';

class Game extends Component {
  componentDidMount() {
    const { scoresStore, gameStore, isMultiplayer } = this.props;
    scoresStore.getScores();
    gameStore.initialize();
    if (isMultiplayer) this.addSocketListeners();
  }

  addSocketListeners = () => {
    socket.on('details:get', this.props.gameStore.updateOpponentStatus);
  };

  render() {
    const { gameStore } = this.props;
    return (
      <div class={styles.gamePage}>
        <PauseMenu />
        <GameNav />
        <div class={styles.gameMainWrapper}>
          <div class={styles.scoreWrapper}>
            {!gameStore.isMultiplayer ? null : (
              <div class={styles.scoreSubWrapper}>
                <div class={`${styles.score} ${styles['--opponent']}`}>
                  <i class={`a-star ${styles.score__icon}`} />
                  <span class={styles.score__text}>
                    {gameStore.opponentStars}
                  </span>
                </div>
                <span class={styles.scoreDivider}>/</span>
              </div>
            )}
            <div class={`${styles.score} ${styles['--user']}`}>
              <i class={`a-star ${styles.score__icon}`} />
              <span class={styles.score__text}>{gameStore.stars}</span>
            </div>
          </div>
          <Powerups />
          <Board />
          <Words />
          <GameoverMenu />
        </div>
      </div>
    );
  }
}

export default inject('gameStore', 'scoresStore')(observer(Game));
