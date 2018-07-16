import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from '../Game.css';

class GameNav extends Component {
  render() {
    const { gameStore } = this.props;
    return (
      <nav class={styles.gameNav}>
        <div class={`${styles.gameNav__corner} ${styles['--right']}`}>
          <span class={styles.gameNav__timer}>{gameStore.formattedTime}</span>
        </div>
        <div class={`${styles.gameNav__corner} ${styles['--left']}`}>
          <i class={`a-pause ${styles.gameNav__pause}`} />
        </div>
      </nav>
    );
  }
}

export default inject('gameStore')(observer(GameNav));
