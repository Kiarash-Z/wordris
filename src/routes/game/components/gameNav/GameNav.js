import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import { Button } from '../../../../components';

import styles from './GameNav.css';
import PauseMenu from '../pauseMenu';
import { getToRemoveLetter } from '../../board/board';

class GameNav extends Component {
  handlePauseClick = () => {
    if (getToRemoveLetter()) return;
    this.props.gameStore.pauseGame();
    PauseMenu.open();
  };
  render() {
    const { gameStore } = this.props;
    return (
      <nav class={styles.gameNav}>
        <div class={`${styles.gameNav__corner} ${styles['--right']}`}>
          <div class={styles.gameNav__cornerBackground} />
          <span class={styles.gameNav__timer}>{gameStore.formattedTime}</span>
        </div>
        <div class={`${styles.gameNav__corner} ${styles['--left']}`}>
          <div
            class={styles.gameNav__cornerBackground}
            id="gameNavLeftCornerBackground"
          />
          <Button
            type="icony"
            icon="a-pause"
            class={styles.gameNav__pause}
            onClick={this.handlePauseClick}
          />
        </div>
      </nav>
    );
  }
}

export default inject('gameStore')(observer(GameNav));
