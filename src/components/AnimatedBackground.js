import { h, Component } from 'preact';
import anime from 'animejs';
import styles from './AnimatedBackground.css';

class AnimatedBackground extends Component {
  svg = {
    lineOne: {
      offset: 700,
      width: '1em',
      color: 'rgba(101,45,212,0.3)'
    },
    lineTwo: {
      offset: 1300,
      width: '0.8em',
      color: '#FFBD40'
    }
  };

  componentDidMount = () => {
    const { lineOne, lineTwo } = this.svg;

    this.TLcontrols = anime.timeline({
      loop: true
    });

    this.TLcontrols.add({
      targets: '#lineOne path',
      strokeDashoffset: [
        { value: [lineOne.offset, 0] },
        { value: [0, -lineOne.offset] }
      ],
      duration: 1300,
      offset: 300,
      easing: 'easeInOutSine'
    });

    this.TLcontrols.add({
      targets: '#lineTwo path',
      strokeDashoffset: [
        { value: [lineTwo.offset, 0] },
        { value: [0, -lineTwo.offset] }
      ],
      duration: 2800,
      offset: 1100,
      easing: 'easeInOutQuart'
    });

    this.TLcontrols.play();
  };

  render() {
    const { children } = this.props;
    const { lineOne, lineTwo } = this.svg;

    return (
      <div className={styles.animatedBg__wrapper}>
        <div className={styles.animatedBg__animateArea}>
          <svg
            id="lineOne"
            className={styles.animatedBg__animateArea_lineOne}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 629.882 122.054"
            preserveAspectRatio="none"
          >
            <g fill="none" class="lines" fill-rule="evenodd">
              <path
                stroke={lineOne.color}
                d=" M 632.8 109.539 Q 493.64 10.947 403.882 15.029 C 324.662 18.632 283.501 105.829 203.882 107.029 Q 122.769 108.252 -1.685 17.976"
                style={{
                  strokeDashoffset: lineOne.offset,
                  strokeDasharray: lineOne.offset,
                  strokeWidth: lineOne.width
                }}
              />
            </g>
          </svg>
          <svg
            id="lineTwo"
            className={styles.animatedBg__animateArea_lineTwo}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 744.172 191.29"
            preserveAspectRatio="none"
          >
            <g fill="none" class="lines" fill-rule="evenodd">
              <path
                stroke={lineTwo.color}
                d=" M 753.066 47.584 Q 529.625 234.584 407.929 155.685 C 379.237 137.083 345.191 122.323 339.398 87.566 C 333.605 52.809 367.399 15.277 406.274 15.002 C 443.448 14.74 474.288 35.431 474.288 81.774 C 474.288 128.116 445.841 149.325 386.413 168.926 C 326.985 188.527 266.257 105.169 193.595 100.24 Q 114.006 94.841 -23.999 151.855"
                style={{
                  strokeDashoffset: lineTwo.offset,
                  strokeDasharray: lineTwo.offset,
                  strokeWidth: lineTwo.width
                }}
              />
            </g>
          </svg>
        </div>
        <div className={styles.animatedBg__content}>{children}</div>
      </div>
    );
  }
}

export { AnimatedBackground };
