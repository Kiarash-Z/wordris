import { h, Component } from 'preact';

import { createBoard } from '../../api/board/board.js';
import styles from './Game.css';
import { ROWS_COUNT, COLUMNS_COUNT } from '../../constants/boardConstants.js';

class Game extends Component {
  componentDidMount() {
    createBoard();
  }
  render() {
    const widthRem = 40;
    return (
      <div>
        <div className={styles.board}>
          <div
            id="gameBoardWrapper"
            className={styles.board__canvasWrapper}
            style={{
              width: `${widthRem}rem`,
              height: `${(ROWS_COUNT / COLUMNS_COUNT) * widthRem}rem`
            }}
          >
            <canvas id="gameBoard" className={styles.board__canvas} />
            <div className={styles.board__canvasUpper} />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
