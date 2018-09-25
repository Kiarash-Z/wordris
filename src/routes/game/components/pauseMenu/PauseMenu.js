import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';
import { route } from 'preact-router';

import styles from './PauseMenu.css';
import MenuScores from '../menuScores';
import { Button } from '../../../../components';

class PauseMenu extends Component {
  static open() {
    const pauseMenu = document.querySelector(`.${styles.pauseMenu}`);
    const background = pauseMenu.querySelector(
      `.${styles.pauseMenu__background}`
    );
    const contentContainer = pauseMenu.querySelector(
      `.${styles.pauseMenu__contentContainer}`
    );
    const subButtons = pauseMenu.querySelectorAll(
      `.${styles.pauseMenu__subAction}`
    );

    pauseMenu.classList.add(styles.visible);
    background.classList.add(styles.fullScreen);
    background.addEventListener('animationend', () => {
      contentContainer.classList.add(styles.fadeIn);
      subButtons.forEach(btn => {
        btn.classList.add(styles.fadeInHorizontal);
      });
    });
  }

  static close() {
    const pauseMenu = document.querySelector(`.${styles.pauseMenu}`);
    const background = pauseMenu.querySelector(
      `.${styles.pauseMenu__background}`
    );
    const contentContainer = pauseMenu.querySelector(
      `.${styles.pauseMenu__contentContainer}`
    );
    const subButtons = pauseMenu.querySelectorAll(
      `.${styles.pauseMenu__subAction}`
    );

    pauseMenu.classList.remove(styles.visible);
    contentContainer.classList.remove(styles.fadeIn);
    background.classList.remove(styles.fullScreen);
    subButtons.forEach(btn => {
      btn.classList.remove(styles.fadeInHorizontal);
    });
  }

  componentDidMount() {
    window.addEventListener('keydown', ({ code }) => {
      if (code === 'Escape') {
        this.props.gameStore.pauseGame();
        PauseMenu.open();
      }
    });
  }

  goBackHome = () => {
    route('/', true);
  };

  resumeGame = () => {
    PauseMenu.close();
    this.props.gameStore.resumeGame();
  };

  render() {
    const { gameStore } = this.props;
    return (
      <div class={styles.pauseMenu}>
        <div class={styles.pauseMenu__background} />

        <div class={styles.pauseMenu__menu}>
          <div class={styles.pauseMenu__contentContainer}>
            <MenuScores />

            <Button
              type="linear"
              color="primary"
              additionalClass={styles.pauseMenu__resume}
              onClick={this.resumeGame}
            >
              <i class="a-play" />
            </Button>

            <span class={styles.pauseMenu__time}>
              {gameStore.formattedTime}
            </span>
          </div>

          <div class={styles.pauseMenu__subActions}>
            <Button
              type="icony"
              icon={gameStore.isMusicPlaying ? 'a-sound' : 'a-mute'}
              onClick={gameStore.toggleBackgroundMusic}
              additionalClass={`${styles.pauseMenu__subAction} ${
                styles['--right']
              }`}
            />
            <Button
              type="icony"
              icon="a-home"
              onClick={this.goBackHome}
              additionalClass={`${styles.pauseMenu__subAction} ${
                styles['--left']
              }`}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default inject('gameStore')(observer(PauseMenu));
