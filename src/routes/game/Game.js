import { h, Component } from 'preact';

import Board from './components/Board';
import styles from './Game.css';

class Game extends Component {
  render() {
    return (
      <div class={styles.gamePage}>
        <Board />
      </div>
    );
  }
}

export default Game;
