import { h, Component } from 'preact';
import anime from 'animejs';
import { reaction } from 'mobx';
import styles from './AnimatedBackground.css';
import { gameStore } from '../stores';

class AnimatedBackground extends Component {
  state = {
    showForeground: false
  };

  bubbles = [
    {
      id: 1,
      size: '2rem',
      style: {
        background: 'rgba(101,45,212,0.2)',
        left: '20%',
        top: '65%'
      }
    },
    {
      id: 2,
      size: '2.5rem',
      style: {
        background: 'rgba(255, 162, 38,0.2)',
        right: '16%',
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
        right: '20%',
        top: '5%'
      }
    },
    {
      id: 14,
      size: '2.8rem',
      style: {
        background: 'rgba(101,45,212,0.2)',
        right: '50%',
        top: '72%'
      }
    }
  ];

  componentDidMount = () => {
    this._playBubbleBg();
    reaction(
      () => gameStore.stars,
      count => {
        if (count) this._playFireBubbles();
      }
    );
    reaction(
      () => gameStore.isInGame,
      inGame => {
        if (inGame) this._playChangePage();
      }
    );
  };

  _playBubbleBg = () => {
    const transitions = [
      'linear',
      'easeInCubic',
      'easeOutQuad',
      'easeOutSine',
      'easeInOutBack',
      'easeInOutQuint'
    ];
    this.bubblesMotions = [];
    this.bubbles.map(item => {
      anime({
        targets: `.animatedBg__bubbles.animatedBg__bubbleItem${item.id}`,
        translateX: Math.floor(Math.random() * 50 + -25),
        translateY: Math.floor(Math.random() * 50 + -25),
        duration: Math.floor(Math.random() * 5000 + 6000),
        easing: transitions[Math.floor(Math.random() * 5 + 0)],
        direction: 'alternate',
        loop: true
      });
    });
  };

  _playChangePage = () => {
    this.setState(
      () => {
        return {
          showForeground: true
        };
      },
      () => {
        this.changePageMotion();
      }
    );
  };

  changePageMotion = () => {
    anime({
      targets: '#animatedBg__changePage_first',
      scale: [0, 1],
      duration: 700,
      offset: 0,
      direction: 'alternate',
      easing: 'easeInOutQuint'
    });
    anime({
      targets: '#animatedBg__changePage_second',
      scale: [0, 1.1],
      duration: 700,
      offset: 100,
      direction: 'alternate',
      easing: 'easeInOutQuint'
    });

    setTimeout(() => {
      this.setState(() => {
        return {
          showForeground: false
        };
      });
    }, 1300);
  };

  _playFireBubbles = () => {
    this.setState(
      () => {
        return {
          showForeground: true
        };
      },
      () => {
        this.fireMotion();
      }
    );
  };

  fireMotion() {
    const canvasEl = document.querySelector('.fireworks');
    const ctx = canvasEl.getContext('2d');
    const numberOfParticules = 30;
    let pointerX = 0;
    let pointerY = 0;
    let colors = [
      'rgba(255, 162, 38,1)',
      'rgba(101,45,212,1)',
      'rgba(255, 162, 38,0.3)',
      'rgba(101,45,212,0.3)'
    ];

    const setParticuleDirection = p => {
      const angle = (anime.random(0, 360) * Math.PI) / 180;
      const value = anime.random(50, 180);
      const radius = [-1, 1][anime.random(0, 1)] * value;
      return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle)
      };
    };

    const createParticule = (x, y) => {
      let p = {};
      p.x = x;
      p.y = y;
      p.color = colors[anime.random(0, colors.length - 1)];
      p.radius = anime.random(16, 32);
      p.endPos = setParticuleDirection(p);
      p.draw = () => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = p.color;
        ctx.fill();
      };
      return p;
    };

    const createCircle = (x, y) => {
      let p = {};
      p.x = x;
      p.y = y;
      p.color = '#FFF';
      p.radius = 0.1;
      p.alpha = 0.5;
      p.lineWidth = 6;
      p.draw = () => {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.lineWidth = p.lineWidth;
        ctx.strokeStyle = p.color;
        ctx.stroke();
        ctx.globalAlpha = 1;
      };
      return p;
    };

    const setCanvasSize = () => {
      canvasEl.width = window.innerWidth * 2;
      canvasEl.height = window.innerHeight * 2;
      canvasEl.style.width = window.innerWidth + 'px';
      canvasEl.style.height = window.innerHeight + 'px';
      canvasEl.getContext('2d').scale(2, 2);
      //change pointer
      pointerX = window.innerWidth / 2;
      pointerY = window.innerHeight - window.innerHeight / 16;
    };

    const renderParticule = anim => {
      for (let i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw();
      }
    };

    const animateParticules = (x, y) => {
      const circle = createCircle(x, y);
      let particules = [];
      for (let i = 0; i < numberOfParticules; i++) {
        particules.push(createParticule(x, y));
      }
      anime
        .timeline()
        .add({
          targets: particules,
          x: p => {
            return p.endPos.x;
          },
          y: p => {
            return p.endPos.y;
          },
          radius: 0.1,
          duration: anime.random(1200, 1800),
          easing: 'easeOutExpo',
          update: renderParticule
        })
        .add({
          targets: circle,
          radius: anime.random(80, 160),
          lineWidth: 0,
          alpha: {
            value: 0,
            easing: 'linear',
            duration: anime.random(600, 800)
          },
          duration: anime.random(1200, 1800),
          easing: 'easeOutExpo',
          update: renderParticule,
          offset: 0
        });
    };

    const render = anime({
      duration: Infinity,
      update: () => {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      }
    });

    setCanvasSize();
    render.play();
    animateParticules(pointerX, pointerY);
    setTimeout(() => {
      this.setState(() => {
        return {
          showForeground: false
        };
      });
    }, 600);
  }

  render() {
    const { children } = this.props;

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
        {this.state.showForeground ? (
          <div class={styles.animatedBg__forground}>
            <canvas
              className="fireworks"
              style={{
                width: '100%',
                height: '100%'
              }}
            />
            <div
              className={styles.animatedBg__changePage}
              id="animatedBg__changePage_second"
              style={{
                background: 'rgba(255, 162, 38,0.4)'
              }}
            />
            <div
              className={styles.animatedBg__changePage}
              id="animatedBg__changePage_first"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export { AnimatedBackground };
