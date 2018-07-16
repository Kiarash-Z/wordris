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
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
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
