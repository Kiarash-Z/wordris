import { h, Component } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from '../Game.css';

class Words extends Component {
  renderWords = () => {
    const { words } = this.props.gameStore;
    const mainWord = words.find(word => word.isMain);
    const subWords = words.filter(word => !word.isMain);

    // put the main word in the center index
    let sortedWords = [];
    const middleIndex = Math.floor(words.length / 2);
    for (let index = 0; index < words.length; index++) {
      if (index === middleIndex) sortedWords.push(mainWord);
      else sortedWords.push(subWords.pop());
    }
    return sortedWords.map(word => (
      <div class={`${styles.word} ${!word.isMain ? '' : styles['--main']}`}>
        <span class={styles.word__count}>{word.count}*</span>
        <span class={styles.word__text}>{word.text}</span>
      </div>
    ));
  };
  render() {
    return <div class={styles.words}>{this.renderWords()}</div>;
  }
}

export default inject('gameStore')(observer(Words));
