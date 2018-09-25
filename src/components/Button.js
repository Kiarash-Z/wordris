import { h } from 'preact';
import styles from './Button.css';

const Button = ({
  children,
  type,
  icon,
  additionalClass,
  color = 'primary',
  ...restProps
}) => {
  let button = null;

  switch (type) {
    case 'linear':
      button = (
        <button
          class={`${styles.button__linear} ${
            styles[`--${color}`]
          } ${additionalClass}`}
          {...restProps}
        >
          {children}
        </button>
      );
      break;
    case 'icony':
      button = (
        <button
          class={`${styles.button__icony} ${additionalClass}`}
          {...restProps}
        >
          <i class={icon} />
        </button>
      );
      break;
  }
  return button;
};

export { Button };
