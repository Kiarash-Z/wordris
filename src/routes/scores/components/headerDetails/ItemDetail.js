import { h } from 'preact';

import styles from './HeaderDetails.css';

const ItemDetail = ({ icon, number, description, color }) => (
  <div class={`${styles.itemDetail} ${styles[`--${color}`]}`}>
    <i class={`${icon} ${styles.itemDetail__icon}`} />
    <span class={styles.itemDetail__number}>{number}</span>
    <span class={styles.itemDetail__description}>{description}</span>
  </div>
);

export default ItemDetail;
