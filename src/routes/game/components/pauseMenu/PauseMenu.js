import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './PauseMenu.css';

class PauseMenu extends Component {
  static open() {
    const pauseMenu = document.getElementById('pauseMenu');
    pauseMenu.classList.add(styles.fullScreen);
  }

  componentDidMount() {
    window.addEventListener('keydown', ({ code }) => {
      if (code === 'Escape') PauseMenu.open();
    });
  }

  render() {
    return (
      <div>
        <div class={styles.pauseMenu} id="pauseMenu" />
      </div>
    );
  }
}

export default inject('gameStore')(observer(PauseMenu));
