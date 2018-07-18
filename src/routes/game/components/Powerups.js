import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from '../Game.css';

class Powerups extends Component {
  renderEarthquakes = () => {
    const { gameStore } = this.props;
    const earthquakes = [];

    for (let index = 0; index < gameStore.earthquakesLeft; index++) {
      earthquakes.push(
        <i class="a-earthquake">
          <span class="path1" />
          <span class="path2" />
          <span class="path3" />
          <span class="path4" />
          <span class="path5" />
          <span class="path6" />
          <span class="path7" />
        </i>
      );
    }
    return <div class={styles.powerup}>{earthquakes}</div>;
  };
  render() {
    const { gameStore } = this.props;
    return <div class={styles.powerups}>{this.renderEarthquakes()}</div>;
  }
}

export default inject('gameStore')(observer(Powerups));
