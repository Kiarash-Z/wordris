import { h, Component } from 'preact';
import Hammer from 'hammerjs';

import { createBoard } from '../../api/board/board.js';
import styles from './Game.css';
import {
  ROWS_COUNT,
  COLUMNS_COUNT,
  PADDING
} from '../../constants/boardConstants.js';
import { moveLeft, moveRight, moveDown } from '../../api/board/controls.js';

class Game extends Component {
  componentDidMount() {
    const words = ['راه', 'خوب', 'کیا'];
    createBoard(words);
    this.addHammerListeners();
  }

  addHammerListeners = () => {
    const gameBoardWrapper = document.getElementById('gameBoardTouchHandler');
    const hammerBoard = new Hammer(gameBoardWrapper);

    let lastPan = 0;

    const handlePanHorizontal = ({ deltaX, type }) => {
      // check for the distance by comparing last 2 points
      const diff = Math.abs(deltaX - lastPan);
      const letterWidth =
        gameBoardWrapper.offsetWidth / COLUMNS_COUNT - PADDING * 2;
      const moveSize = Math.floor(diff / letterWidth);
      if (moveSize === 1) {
        if (diff >= letterWidth) {
          if (type === 'panleft') moveLeft();
          else moveRight();
          lastPan = deltaX;
        }
      }
    };

    hammerBoard.on('tap', moveDown);
    hammerBoard.on('panleft panright', handlePanHorizontal);
    hammerBoard.on('panend', () => {
      // reset lastPan
      lastPan = 0;
    });
  };

  render() {
    const widthRem = 45;
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
