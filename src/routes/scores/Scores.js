import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './Scores.css';
import HeaderDetails from './components/headerDetails';

class Scores extends Component {
  componentDidMount() {
    this.props.scoresStore.getScores();
  }
  render() {
    return (
      <div class={styles.scoresPage}>
        <header class={styles.scoresPage__header}>
          <h1 class={styles.scoresPage__title}>آمار و امتیازات</h1>
          <HeaderDetails />
        </header>
      </div>
    );
  }
}

export default inject('scoresStore')(observer(Scores));
