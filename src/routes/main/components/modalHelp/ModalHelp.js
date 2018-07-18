import { h, Component } from 'preact';
import swal from 'sweetalert';

import styles from './ModalHelp.css';

class ModalHelp extends Component {
  componentDidMount() {
    const isOpenedAtFirstLaunch = JSON.parse(
      localStorage.getItem('isHelpModalOpened')
    );
    if (!isOpenedAtFirstLaunch) {
      ModalHelp.open();
      localStorage.setItem('isHelpModalOpened', 'true');
    }
  }
  static open() {
    const modal = document.getElementById('modalHelp');
    swal({
      content: modal,
      button: false
    });
  }
  render() {
    return (
      <div id="modalHelp">
        <h1 class={styles.modalHelp__title}>راهنما</h1>
        <h2 class={styles.modalHelp__subTitle}>وردریس = ورد + تتریس</h2>
        <p class={styles.modalHelp__description}>
          وردریس یه مدل تتریس هستش ولی بجای شکل‌ها اینجا با حروف و کلمات سروکله
          میزنی!
        </p>

        <p class={styles.modalHelp__description}>
          <strong>هدف بازی:</strong> با حروفی که از بالا میفتن ۳ کلمه ای که
          پایین صفحه بازی نمایش داده میشه درست کنی
        </p>

        <p class={styles.modalHelp__description}>
          <strong>قانون بازی: </strong>
          کلمات رو در جهات <strong>راست به چپ</strong> یا{' '}
          <strong>بالا به پایین</strong> یا <strong>پایین به بالا</strong> باید
          درست کنی
        </p>

        <p class={styles.modalHelp__description}>
          <strong>راهنمای کنترل های بازی: (صفحه لمسی٬ کیبورد):</strong>
        </p>

        <ul class={styles.modalHelp__keyList}>
          <li class={styles.modalHelp__keyItem}>
            <span>جابجایی حرف به راست</span>
            <div>
              <code class={styles.modalHelp__keyHighlight}>
                Arrow Right,<i class="a-swipeRight" />
              </code>
            </div>
          </li>

          <li class={styles.modalHelp__keyItem}>
            <span>جابجایی حرف به جپ</span>
            <div>
              <code class={styles.modalHelp__keyHighlight}>
                Arrow Left,<i class="a-swipeLeft" />
              </code>
            </div>
          </li>

          <li class={styles.modalHelp__keyItem}>
            <span>جابجایی سریع به پایین</span>
            <div>
              <code class={styles.modalHelp__keyHighlight}>
                Click,<i class="a-tap" />
              </code>
            </div>
          </li>

          <li class={styles.modalHelp__keyItem}>
            <span class={styles.modalHelp__subContainer}>
              <span>قدرت زلزله</span>
              <i class="a-earthquake">
                <span class="path1" />
                <span class="path2" />
                <span class="path3" />
                <span class="path4" />
                <span class="path5" />
                <span class="path6" />
                <span class="path7" />
              </i>
            </span>
            <div>
              <code class={styles.modalHelp__keyHighlight}>
                E,<i class="a-swipeUp" />
              </code>
            </div>
          </li>

          <li class={styles.modalHelp__keyItem}>
            <span>توقف بازی</span>
            <div>
              <code class={styles.modalHelp__keyHighlight}>Esc</code>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ModalHelp;
