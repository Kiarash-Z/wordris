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
          <canvas id="gameBoard" className={styles.board__canvas} />
        </div>
      </div>
    );
  }
}

export default Game;
