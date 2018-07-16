import { h, Component } from 'preact';
import { Router } from 'preact-router';

import { AnimatedBackground } from './components';
import Game from './routes/game';
import Main from './routes/main';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

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
      <div id="app">
        <AnimatedBackground>
          <Router onChange={this.handleRoute}>
            <Game path="/game" />
            <Main path="/" />
          </Router>
        </AnimatedBackground>
      </div>
    );
  }
}

export default App;
