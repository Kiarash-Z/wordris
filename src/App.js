import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'mobx-preact';

import { AnimatedBackground } from './components';

// pages
import Game from './routes/game';
import Main from './routes/main';
import Scores from './routes/scores/Scores';

// menus
import GameoverMenu from './routes/game/components/gameoverMenu/GameoverMenu';
import PauseMenu from './routes/game/components/pauseMenu/PauseMenu';

// stores
import * as stores from './stores';
import socket from './socket';

class App extends Component {
  handleRoute = e => {
    // Preact bug - reset DOM in menus
    if (e.previous === '/game') {
      GameoverMenu.close();
      PauseMenu.close();
    } else if (e.previous === '/game?isMultiplayer=true') {
      GameoverMenu.close();
      socket.emit('details:set', {
        isGameovered: true,
        stars: stores.gameStore.opponentStars
      });
    }
    this.currentUrl = e.url;
  };

  render() {
    return (
      <Provider {...stores}>
        <div id="app">
          <AnimatedBackground>
            <Router onChange={this.handleRoute}>
              <Game path="/game/:params?" />
              <Scores path="scores" />
              <Main path="/" />
            </Router>
          </AnimatedBackground>
        </div>
      </Provider>
    );
  }
}

export default App;
