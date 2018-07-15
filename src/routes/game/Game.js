import { h, Component } from 'preact';

import { createBoard } from '../../api/board/board.js';
import styles from './Game.css';
import { ROWS_COUNT, COLUMNS_COUNT } from '../../constants/boardConstants.js';

class Game extends Component {
  componentDidMount() {
    createBoard();
  }
  render() {
    const widthRem = 90;
    return (
      <div className={styles.gamePage}>
        <div
          id="gameBoardWrapper"
          className={styles.gamePage__canvasWrapper}
          style={{
            width: `${widthRem}%`,
            height: `${widthRem}%`
          }}
        >
          <canvas id="gameBoard" className={styles.board__canvas} />
          <div className={styles.board__canvasUpper} />
        </div>
      </div>
    );
  }
}

export default Game;
