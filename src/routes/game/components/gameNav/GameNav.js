import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import { Button } from '../../../../components';

import styles from './GameNav.css';
import pauseStyles from '../../Game.css';

class GameNav extends Component {
  handlePauseClick = () => {
    const pauseMenu = document.getElementById('pauseMenu');
    pauseMenu.classList.add(pauseStyles.fullScreen);
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
            type="circle"
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
