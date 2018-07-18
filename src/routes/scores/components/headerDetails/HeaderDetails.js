import { h } from 'preact';
import { inject, observer } from 'mobx-preact';

import styles from './HeaderDetails.css';
import ItemDetail from './ItemDetail';

const HeaderDetails = ({ scoresStore }) => (
  <div class={styles.headerDetails}>
    <ItemDetail
      color="yellow"
      number={scoresStore.highestStar}
      icon="a-crown"
      description="بالاترین ستاره"
    />

    <div class={styles.headerDetails__subContainer}>
      <ItemDetail
        color="secondary"
        number={scoresStore.scoresCount}
        description="تعداد بازی ها"
      />

      <ItemDetail
        color="gray"
        number={scoresStore.averageDuration}
        description="میانگین مدت بازی‌ها"
      />
    </div>
  </div>
);

export default inject('scoresStore')(observer(HeaderDetails));
