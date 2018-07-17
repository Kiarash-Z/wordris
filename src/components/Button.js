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
    case 'big':
      button = (
        <button
          class={`${styles.button__big} ${
            styles[`--${color}`]
          } ${additionalClass}`}
          {...restProps}
        >
          {children}
        </button>
      );
      break;
    case 'circle':
      button = (
        <button
          class={`${styles.button__circle} ${additionalClass}`}
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
