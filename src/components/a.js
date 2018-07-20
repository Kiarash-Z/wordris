import { h, Component } from 'preact';
import anime from 'animejs';
import styles from './AnimatedBackground.css';

class AnimatedBackground extends Component {
  svg = {
    lineOne: {
      offset: 700,
      width: '0.9em',
      color: 'rgba(101,45,212,0.3)'
    },
    lineTwo: {
      offset: 1300,
      width: '0.8em',
      color: 'rgba(255, 162, 38,0.3)'
    },
    lineThree: {
      offset: 2300,
      width: '0.7em',
      color: 'rgba(101,45,212,0.3)'
    }
  };

  componentDidMount = () => {
    const { lineOne, lineTwo, lineThree } = this.svg;

    this.drawLineTL = anime.timeline({
      loop: true
    });
    this.bubblesMotions = [];

    this.drawLineTL.add({
      targets: '#bubbles .bubbles__one',
      strokeDashoffset: [
        { value: [lineOne.offset, 0] },
        { value: [0, -lineOne.offset] }
      ],
      duration: 1300,
      offset: 300,
      easing: 'easeInOutSine'
    });
    this.drawLineTL.add({
      targets: '#bubbles .bubbles__two',
      strokeDashoffset: [
        { value: [lineTwo.offset, 0] },
        { value: [0, -lineTwo.offset] }
      ],
      duration: 2800,
      offset: 1300,
      easing: 'easeInOutQuart'
    });
    this.drawLineTL.add({
      targets: '#bubbles .bubbles__three',
      strokeDashoffset: [
        { value: [lineThree.offset, 0] },
        { value: [0, -lineThree.offset] }
      ],
      duration: 3800,
      offset: 3100,
      easing: 'easeInOutQuart'
    });

    var path_one = anime.path('#bubbles .bubbles__one');
    var path_two = anime.path('#bubbles .bubbles__two');
    var path_three = anime.path('#bubbles .bubbles__three');

    this.bubblesMotions[0] = anime({
      targets: '.bubbles .bubble_1',
      translateX: path_one('x'),
      translateY: path_one('y'),
      easing: 'easeInQuad',
      duration: 15000,
      loop: true
    });
    this.bubblesMotions[1] = anime({
      targets: '.bubbles .bubble_2',
      translateX: path_two('x'),
      translateY: path_two('y'),
      easing: 'linear',
      duration: 25000,
      loop: true
    });
    this.bubblesMotions[2] = anime({
      targets: '.bubbles .bubble_3',
      translateX: path_three('x'),
      translateY: path_three('y'),
      easing: 'linear',
      duration: 17000,
      loop: true
    });
    this.bubblesMotions[3] = anime({
      targets: '.bubbles .bubble_4',
      translateX: path_three('x'),
      translateY: path_three('y'),
      easing: 'linear',
      duration: 15000,
      loop: true,
      delay: 1000
    });
    this.bubblesMotions[4] = anime({
      targets: '.bubbles .bubble_5',
      translateX: path_three('x'),
      translateY: path_three('y'),
      easing: 'linear',
      duration: 17000,
      loop: true,
      delay: 5000
    });

    this.drawLineTL.play();
    // this.bubblesTL.play();
  };

  render() {
    const { children } = this.props;
    const { lineOne, lineTwo, lineThree } = this.svg;

    return (
      <div class={styles.animatedBg__wrapper}>
        <div class={styles.animatedBg__animateArea}>
          <svg
            id="bubbles"
            class={styles.animatedBg__animateArea_bubbles}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 500"
            preserveAspectRatio="xMidYMid slice"
          >
            <g fill="none" class="roads">
              <path
                stroke={lineOne.color}
                style={{
                  strokeDashoffset: lineOne.offset,
                  strokeDasharray: lineOne.offset,
                  strokeWidth: lineOne.width
                }}
                className="bubbles__one"
                d=" M 224.092 504.5 Q 174.362 364.976 181.76 286.084 C 187.637 223.413 207.993 172.754 237.61 117.469 Q 257.332 80.653 305.198 20"
              />
              <path
                stroke={lineTwo.color}
                style={{
                  strokeDashoffset: lineTwo.offset,
                  strokeDasharray: lineTwo.offset,
                  strokeWidth: lineTwo.width
                }}
                className="bubbles__two"
                d=" M 138 502 Q 184.673 437.572 181 396 C 177.657 358.156 131.393 343.061 129 305 C 126.498 265.195 168.247 243.647 173 205 C 180.129 147.029 106.523 109.717 123 52 Q 128.958 31.131 152 -30"
              />
              <path
                stroke={lineThree.color}
                style={{
                  strokeDashoffset: lineThree.offset,
                  strokeDasharray: lineThree.offset,
                  strokeWidth: lineThree.width
                }}
                className="bubbles__three"
                d=" M 6.38 518 Q 64.34 440.291 67.38 389 C 69.37 355.426 48.303 329.544 49.38 296 C 50.764 252.877 94.121 224.314 87.38 181 C 80.639 137.686 -22.088 81.897 -24 -32"
              />
            </g>
            <g class="bubbles">
              <circle
                className="bubble_1"
                cx="0"
                cy="0"
                r="13"
                fill={lineOne.color}
              />
              <circle
                className="bubble_2"
                cx="0"
                cy="0"
                r="15"
                fill={lineTwo.color}
              />
              <circle
                className="bubble_3"
                cx="0"
                cy="0"
                r="15"
                fill={lineOne.color}
              />
              <circle
                className="bubble_4"
                cx="0"
                cy="0"
                r="10"
                stroke="rgba(101,45,212,1)"
                stroke-width="3"
                fill="transparent"
              />
              <circle
                className="bubble_5"
                cx="0"
                cy="0"
                r="9"
                fill={lineOne.color}
              />
            </g>
          </svg>
        </div>
        <div class={styles.animatedBg__content}>{children}</div>
      </div>
    );
  }
}

export { AnimatedBackground };
