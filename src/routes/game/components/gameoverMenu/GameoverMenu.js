import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';
import { route } from 'preact-router';

import { Button } from '../../../../components';
import styles from './GameoverMenu.css';

class GameoverMenu extends Component {
  static open() {
    const gameoverMenu = document.querySelector(`.${styles.gameoverMenu}`);
    gameoverMenu.classList.add(styles.visible);
    const background = gameoverMenu.querySelector(
      `.${styles.gameoverMenu__background}`
    );
    background.classList.add(styles.fullScreen);

    background.addEventListener('animationend', () => {
      const scoreContainer = gameoverMenu.querySelector(
        `.${styles.scoreContainer}`
      );
      const title = gameoverMenu.querySelector(
        `.${styles.gameoverMenu__title}`
      );
      const time = gameoverMenu.querySelector(`.${styles.gameoverMenu__time}`);
      const buttons = gameoverMenu.querySelectorAll(
        `.${styles.gameoverMenu__button}`
      );

      title.classList.add(styles.scaleIn);
      scoreContainer.classList.add(styles.fadeIn);
      time.classList.add(styles.fadeIn);
      buttons.forEach(button => {
        button.classList.add(styles.fadeLeft);
      });
    });
  }

  static close() {
    const gameoverMenu = document.querySelector(`.${styles.gameoverMenu}`);
    const background = gameoverMenu.querySelector(
      `.${styles.gameoverMenu__background}`
    );
    const scoreContainer = gameoverMenu.querySelector(
      `.${styles.scoreContainer}`
    );
    const title = gameoverMenu.querySelector(`.${styles.gameoverMenu__title}`);
    const time = gameoverMenu.querySelector(`.${styles.gameoverMenu__time}`);
    const buttons = gameoverMenu.querySelectorAll(
      `.${styles.gameoverMenu__button}`
    );

    gameoverMenu.classList.remove(styles.visible);
    background.classList.remove(styles.fullScreen);
    title.classList.remove(styles.scaleIn);
    scoreContainer.classList.remove(styles.fadeIn);
    time.classList.remove(styles.fadeIn);
    buttons.forEach(button => {
      button.classList.remove(styles.fadeLeft);
    });
  }

  goBackHome = () => {
    GameoverMenu.close();
    route('/', true);
  };

  render() {
    const { gameStore, scoresStore } = this.props;
    return (
      <div class={styles.gameoverMenu}>
        <div class={styles.gameoverMenu__background} />

        <div class={styles.gameoverMenu__menu}>
          <div class={styles.scoreContainer}>
            <div class={styles.score}>
              <i class={`a-star ${styles.score__icon}`} />
              <span class={styles.score__text}>{gameStore.score}</span>
            </div>
            <div class={styles.highestScore}>
              <i class={`a-crown ${styles.highestScore__icon}`} />
              <div lass={styles.highestScore__subContainer}>
                <span class={styles.highestScore__text}>
                  {scoresStore.highestStar}
                </span>
              </div>
            </div>
          </div>

          <h1 class={styles.gameoverMenu__title}>رسیدی به سقف!</h1>

          <span class={styles.gameoverMenu__time}>
            {gameStore.formattedTime}
          </span>

          <Button
            type="big"
            color="primary"
            additionalClass={styles.gameoverMenu__button}
            onClick={gameStore.retry}
          >
            <i class={`a-retry ${styles.gameoverMenu__buttonIcon}`} />
            یه دست دیگه
          </Button>

          <Button
            type="big"
            color="gray"
            additionalClass={styles.gameoverMenu__button}
            onClick={this.goBackHome}
          >
            <i class={`a-home ${styles.gameoverMenu__buttonIcon}`} />
            برگردیم
          </Button>
        </div>
      </div>
    );
  }
}

export default inject('gameStore', 'scoresStore')(observer(GameoverMenu));
