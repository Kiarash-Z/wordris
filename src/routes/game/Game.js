import { h, Component } from 'preact';

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
    const widthRem = 55;
    return (
      <div>
        <div className={styles.board}>
          <div
            id="gameBoardWrapper"
            className={styles.board__canvasWrapper}
            style={{
              width: `${widthRem}rem`,
              height: `calc(${(ROWS_COUNT / COLUMNS_COUNT) *
                widthRem}rem + ${PADDING * 2}px)`
            }}
          >
            <canvas id="gameBoard" className={styles.board__canvas} />
            <div
              id="gameBoardTouchHandler"
              className={styles.board__canvasUpper}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
