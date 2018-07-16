import { h, Component } from 'preact';
import styles from './Button.css';

class Button extends Component {
  render() {
    const { text, type, icon } = this.props;
    let button = null;

    switch (type) {
      case 'big':
        button = (
          <a className={styles.button__big}>
            <span>{text}</span>
          </a>
        );
        break;
      case 'circle':
        button = (
          <a className={styles.button__circle}>
            <i className={icon} />
          </a>
        );
        break;
    }
    return button;
  }
}

export { Button };
