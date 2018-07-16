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
          <Button type="circle" icon={'speaker'} />
          <Button type="circle" icon={'statistical-chart'} />
          <Button type="circle" icon={'share'} />
        </nav>
      </div>
    );
  }
}

export default Main;
