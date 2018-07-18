import { fabric } from 'fabric';
import {
  board,
  moveTopLettersDown,
  toggleGamePause,
  getFallingLetter,
  getToRemoveLetter
} from './board';
import {
  FAST_FORWARD_DURATION,
  PADDING
} from '../../../constants/gameConstants';
import { animateLetterDown } from './letters';
import { gameStore } from '../../../stores';

const earthquakeAnimation = (letter, isLast, initialLeft) => {
  const fallingLetter = getFallingLetter();
  toggleGamePause(true);
  const animateHorizontally = leftRight => {
    const finalValue =
      leftRight === 'left' ? initialLeft + PADDING : initialLeft - PADDING;
    return new Promise(resolve => {
      letter.animate('left', finalValue, {
        duration: FAST_FORWARD_DURATION / 2,
        onChange: board.renderAll.bind(board),
        easing: fabric.util.ease.easeInOutBounce,
        onComplete() {
          resolve();
        }
      });
    });
  };
  animateHorizontally('right')
    .then(() => animateHorizontally('left'))
    .then(() => animateHorizontally('right'))
    .then(() => animateHorizontally('left'))
    .then(() => {
      letter.animate('top', board.getHeight(), {
        duration: FAST_FORWARD_DURATION,
        onChange: board.renderAll.bind(board),
        onComplete() {
          const sameColumnLetters = board
            .getObjects()
            .filter(
              o =>
                !o.mIsActive &&
                o.mIsLetter &&
                o.mGetColumn() === letter.mGetColumn()
            );
          moveTopLettersDown(sameColumnLetters).then(() => {
            if (isLast) {
              fallingLetter.mIsFallingStopped = false;
              animateLetterDown();
            }
            board.remove(letter);
          });
        }
      });
    });
};

const earthquake = () => {
  const letters = board.getObjects().filter(o => o.mIsLetter);

  // if there is a letter currently shaking or we have none left we don't apply the powerup
  const currentlyQuaking = getToRemoveLetter();
  if (
    currentlyQuaking ||
    !gameStore.earthquakesLeft ||
    !letters.filter(l => !l.mIsActive).length
  )
    return;
  gameStore.decreaseEarthquake();

  // removes the first row of the letters
  const lowestRow = letters
    .map(letter => letter.mGetRow())
    .reduce((prev, cur) => (prev > cur ? prev : cur));
  const firstRow = letters.filter(
    letter => letter.mGetRow() === lowestRow && !letter.mIsActive
  );
  firstRow.forEach((letter, index) => {
    letter.mIsGonnaRemove = true;
    const initialLeft = letter.left;
    earthquakeAnimation(letter, index === firstRow.length - 1, initialLeft);
  });
};

export { earthquake };
