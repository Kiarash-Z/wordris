import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import { createBoard } from '../../api/board/board.js';
import styles from './Game.css';
import {
  ROWS_COUNT,
  COLUMNS_COUNT,
  PADDING
} from '../../constants/boardConstants.js';

class Game extends Component {
  componentDidMount() {
    const words = ['راه', 'خوب', 'سلام'];
    createBoard(words);
  }

  render() {
    const { gameStore } = this.props;
    const widthRem = 55;
    return (
      <div class={styles.gamePage}>
        <div class={styles.board}>
          <div
            id="gameBoardWrapper"
            class={styles.board__canvasWrapper}
            style={{
              width: `${widthRem}rem`,
              height: `calc(${(ROWS_COUNT / COLUMNS_COUNT) *
                widthRem}rem + ${PADDING * 2}px)`
            }}
          >
            <canvas id="gameBoard" class={styles.board__canvas} />
            <div id="gameBoardTouchHandler" class={styles.board__canvasUpper} />
          </div>
        </div>
      </div>
    );
  }
}

export default inject('gameStore')(observer(Game));
