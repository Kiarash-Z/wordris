import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'mobx-preact';

import { AnimatedBackground } from './components';

// pages
import Game from './routes/game';
import Main from './routes/main';

import GameoverMenu from './routes/game/components/gameoverMenu/GameoverMenu';
import PauseMenu from './routes/game/components/pauseMenu/PauseMenu';

// stores
import * as stores from './stores';

class App extends Component {
  handleRoute = e => {
    // Preact bug - reset DOM in Menus
    if (e.previous === '/game') {
      GameoverMenu.close();
      PauseMenu.close();
    }
    this.currentUrl = e.url;
  };

  render() {
    return (
      <Provider {...stores}>
        <div id="app">
          <AnimatedBackground>
            <Router onChange={this.handleRoute}>
              <Game path="/game" />
              <Main path="/" />
            </Router>
          </AnimatedBackground>
        </div>
      </Provider>
    );
  }
}

export default App;
