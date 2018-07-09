import { h, Component } from 'preact';

import { createBoard } from '../../api/board';
import styles from './Game.css';

class Game extends Component {
  componentDidMount() {
    createBoard();
  }
  render() {
    return (
      <div>
        <div className={styles.board}>
          <div id="gameBoardWrapper" className={styles.board__canvasWrapper}>
            <canvas id="gameBoard" className={styles.board__canvas} />
            <div className={styles.board__canvasUpper} />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
