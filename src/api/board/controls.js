import {
  FAST_FORWARD_DURATION,
  COLUMNS_COUNT,
  PADDING,
  COLUMN_CHANGE_DURATION
} from '../../constants/boardConstants';
import { board, getFallingLetter, columnRowWidth, check } from './board';
import { animateLetterDown, getStopPosition } from './letters';

const animateHorizontally = (letter, horizontalValue) => {
  letter.animate('left', horizontalValue, {
    duration: COLUMN_CHANGE_DURATION,
    onChange: board.renderAll.bind(board),
    onComplete() {
      letter.mIsFallingStopped = false;
      animateLetterDown();
    },

    // linear easing
    easing: (t, b, c, d) => (c * t) / d + b
  });
};

const isAbleToMove = (letter, horizontalValue) => {
  const comparedColumn =
    horizontalValue > letter.left
      ? letter.mGetColumn() + 1
      : letter.mGetColumn() - 1;
  const blockedObject = board.getObjects().find(o => {
    const isInBetween = value =>
      value >= o.top - 5 && value <= o.top + o.height + 5;
    return (
      o.mIsLetter &&
      comparedColumn === o.mGetColumn() &&
      (isInBetween(letter.top) || isInBetween(letter.top + letter.height))
    );
  });

  // check for a blocked object or being out of board bounds to prevent moving
  return !(
    blockedObject ||
    comparedColumn > COLUMNS_COUNT ||
    comparedColumn < 1
  );
};

const moveRight = () => {
  const letter = getFallingLetter();
  const letterLeft = (letter.mGetColumn() - 1) * columnRowWidth + PADDING;
  const horizontalValue = letterLeft + columnRowWidth;
  if (
    !isAbleToMove(letter, horizontalValue) ||
    letter.mIsFastForwarding ||
    letter.mIsFallingStopped
  )
    return;
  letter.mIsFallingStopped = true;
  animateHorizontally(letter, horizontalValue);
};

const moveLeft = () => {
  const letter = getFallingLetter();
  const letterLeft = (letter.mGetColumn() - 1) * columnRowWidth + PADDING;
  const horizontalValue = letterLeft - columnRowWidth;
  if (
    !isAbleToMove(letter, horizontalValue) ||
    letter.mIsFastForwarding ||
    letter.mIsFallingStopped
  )
    return;
  letter.mIsFallingStopped = true;
  animateHorizontally(letter, horizontalValue);
};

const moveDown = (e, isDefaultActionPrevented) => {
  const letter = getFallingLetter();
  const forwardingObject = board
    .getObjects()
    .find(o => o.mIsFastForwarding || o.mIsFallingStopped);
  if (forwardingObject) return;
  if (isDefaultActionPrevented) e.preventDefault();
  letter.mIsFallingStopped = true;
  letter.mIsFastForwarding = true;
  letter.animate('top', getStopPosition(), {
    duration: FAST_FORWARD_DURATION,
    onChange: board.renderAll.bind(board),
    onComplete() {
      check(letter);
    }
  });
};

const addControls = () => {
  window.addEventListener('keydown', e => {
    const { code } = e;
    const letter = getFallingLetter();
    if (!letter) return;
    switch (code) {
      case 'ArrowRight': {
        moveRight();
        break;
      }
      case 'ArrowLeft': {
        moveLeft();
        break;
      }
      case 'ArrowDown': {
        moveDown(e, true);
        break;
      }
    }
  });
};

export { addControls, moveLeft, moveRight, moveDown };
