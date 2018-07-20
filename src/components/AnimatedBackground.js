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

  bubbles = [
    {
      id: 1,
      size: '2rem',
      style: {
        background: 'rgba(101,45,212,0.2)',
        right: '70%',
        top: '60%'
      }
    },
    {
      id: 2,
      size: '2.5rem',
      style: {
        background: 'rgba(255, 162, 38,0.2)',
        right: '32%',
        top: '62%'
      }
    },
    {
      id: 3,
      size: '5rem',
      style: {
        background: 'rgba(255, 162, 38,0.2)',
        left: '10%',
        top: '35%'
      }
    },
    {
      id: 4,
      size: '2.5rem',
      style: {
        border: 'solid 2px rgb(255, 162, 38)',
        left: '10%',
        top: '35%',
        marginLeft: '3rem',
        marginTop: '2.5rem'
      }
    },
    {
      id: 5,
      size: '4rem',
      style: {
        background: 'rgba(101,45,212,0.2)',
        right: '5%',
        top: '45%'
      }
    },
    {
      id: 6,
      size: '2rem',
      style: {
        border: 'solid 2px rgb(101,45,212)',
        right: '5%',
        top: '45%',
        marginRight: '2.5rem',
        marginTop: '1.5rem'
      }
    },
    {
      id: 7,
      size: '4.5rem',
      style: {
        background: 'rgba(101,45,212,0.2)',
        right: '15%',
        top: '28%'
      }
    },
    {
      id: 8,
      size: '4rem',
      style: {
        background: 'rgba(255, 162, 38,0.2)',
        left: '50%',
        top: '20%'
      }
    },
    {
      id: 9,
      size: '2.5rem',
      style: {
        border: 'solid 2px rgb(255, 162, 38)',
        left: '50%',
        top: '20%',
        marginLeft: '2rem',
        marginTop: '1.5rem'
      }
    },
    {
      id: 10,
      size: '2.5rem',
      style: {
        background: 'rgba(101,45,212,0.2)',
        right: '62%',
        top: '28%'
      }
    },
    {
      id: 11,
      size: '3rem',
      style: {
        background: 'rgba(101,45,212,0.2)',
        left: '15%',
        top: '10%'
      }
    },
    {
      id: 12,
      size: '1.5rem',
      style: {
        border: 'solid 2px rgb(101,45,212)',
        left: '15%',
        top: '10%',
        marginLeft: '-0.2rem',
        marginTop: '1.8rem'
      }
    },
    {
      id: 13,
      size: '1.8rem',
      style: {
        background: 'rgba(101,45,212,0.2)',
        right: '30%',
        top: '7%'
      }
    }
  ];

  componentDidMount = () => {
    this.bubblesMotions = [];
    this.bubbles.map(item => {
      anime({
        targets: `.animatedBg__bubbles.animatedBg__bubbleItem${item.id}`,
        translateX: Math.floor(Math.random() * 30 + 10),
        translateY: Math.floor(Math.random() * 30 + 10),
        duration: Math.floor(Math.random() * 10000 + 5000),
        easing: 'linear',
        direction: 'alternate',
        loop: true
      });
    });
  };

  render() {
    const { children } = this.props;
    const { lineOne, lineTwo, lineThree } = this.svg;

    return (
      <div class={styles.animatedBg__wrapper}>
        <div class={styles.animatedBg__animateArea}>
          {this.bubbles.map(item => (
            <div
              key={item.id}
              className={`animatedBg__bubbles animatedBg__bubbleItem${item.id}`}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                width: item.size,
                height: item.size,
                ...item.style
              }}
            />
          ))}
        </div>
        <div class={styles.animatedBg__content}>{children}</div>
      </div>
    );
  }
}

export { AnimatedBackground };
