import { h, Component } from 'preact';
import { createBoard } from '../../api/board';

class Game extends Component {
  componentDidMount() {
    createBoard();
  }
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'right' }}>صفحه بازی</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8rem' }}>
          <canvas id="gameBoard" style={{ width: '50rem', height: '70vh', border: 'var(--border-tertiary)', borderRadius: '5px' }} />
        </div>
      </div>
    );
  }
}

export default Game;
