import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'mobx-preact';

import { AnimatedBackground } from './components';

// pages
import Game from './routes/game';
import Main from './routes/main';

// stores
import * as stores from './stores';

class App extends Component {
  handleRoute = e => {
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
