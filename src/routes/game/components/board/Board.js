import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './Board.css';

class Board extends Component {
  render() {
    const { gameStore } = this.props;
    return (
      <div class={styles.board}>
        <div>
          <div
            id="nextLetter"
            class={styles.board__nextLetter}
            style={{ background: gameStore.nextLetter.color }}
          >
            {gameStore.nextLetter.text}
          </div>
        </div>
        <div id="gameBoardWrapper" class={styles.board__canvasWrapper}>
          <div>
            <canvas id="gameBoard" class={styles.board__canvas} />
          </div>
          <div id="gameBoardTouchHandler" class={styles.board__canvasUpper} />
        </div>
      </div>
    );
  }
}

export default inject('gameStore')(observer(Board));
