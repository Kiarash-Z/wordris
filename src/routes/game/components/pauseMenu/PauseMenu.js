import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';
import { route } from 'preact-router';

import styles from './PauseMenu.css';
import MenuScores from '../menuScores';
import { Button } from '../../../../components';

class PauseMenu extends Component {
  static open() {
    const pauseMenu = document.querySelector(`.${styles.pauseMenu}`);
    pauseMenu.classList.add(styles.visible);

    const background = pauseMenu.querySelector(
      `.${styles.pauseMenu__background}`
    );
    background.classList.add(styles.fullScreen);

    background.addEventListener('animationend', () => {
      const contentContainer = pauseMenu.querySelector(
        `.${styles.pauseMenu__contentContainer}`
      );
      contentContainer.classList.add(styles.fadeIn);
    });
  }

  static close() {
    const pauseMenu = document.querySelector(`.${styles.pauseMenu}`);
    pauseMenu.classList.remove(styles.visible);

    const background = pauseMenu.querySelector(
      `.${styles.pauseMenu__background}`
    );
    const contentContainer = pauseMenu.querySelector(
      `.${styles.pauseMenu__contentContainer}`
    );

    contentContainer.classList.remove(styles.fadeIn);
    background.classList.remove(styles.fullScreen);
  }

  componentDidMount() {
    window.addEventListener('keydown', ({ code }) => {
      if (code === 'Escape') PauseMenu.open();
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

            <div class={styles.pauseMenu__subActions}>
              <Button type="icony" icon="a-sound" />
              <Button type="icony" icon="a-home" onClick={this.goBackHome} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('gameStore')(observer(PauseMenu));
