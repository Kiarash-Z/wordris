import { h, Component } from 'preact';
import styles from './Main.css';
import { Button } from '../../components';

class Main extends Component {
  render() {
    return (
      <div className={styles.mainPage}>
        <span style={{ height: 50 }} />
        <section className={styles.mainPage__topSection}>
          <h1 className={styles.mainPage__topSection_title}>
            ورد<span>ر</span>یس
          </h1>
          <Button type="big" text={'بزن بریم'} />
        </section>
        <nav className={styles.mainPage__botomNav}>
          <Button type="circle" icon="a-sound" />
          <Button type="circle" icon="a-stats" />
          <Button type="circle" icon="a-share" />
        </nav>
      </div>
    );
  }
}

export default Main;
