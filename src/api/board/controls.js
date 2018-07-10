import {
  FAST_FORWARD_DURATION,
  COLUMNS_COUNT,
  PADDING
} from '../../constants/boardConstants';
import { board, getFallingLetter, columnRowWidth, check } from './board';
import { animateLetterDown, getStopPosition } from './letters';

const animateHorizontally = (letter, horizontalValue) => {
  letter.animate('left', horizontalValue, {
    duration: FAST_FORWARD_DURATION,
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

const addControls = () => {
  window.addEventListener('keydown', e => {
    const { code } = e;
    const letter = getFallingLetter();
    if (!letter) return;
    switch (code) {
      case 'ArrowRight': {
        // instead of letter.left we use this for in-row key presses and this handles simultaneous keydowns
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
        break;
      }
      case 'ArrowLeft': {
        // instead of letter.left we use this for in-row key presses and this handles simultaneous keydowns
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
        break;
      }
      case 'ArrowDown': {
        const forwardingObject = board
          .getObjects()
          .find(o => o.mIsFastForwarding || o.mIsFallingStopped);
        if (forwardingObject) return;
        e.preventDefault();
        letter.mIsFallingStopped = true;
        letter.mIsFastForwarding = true;
        letter.animate('top', getStopPosition(), {
          duration: FAST_FORWARD_DURATION,
          onChange: board.renderAll.bind(board),
          onComplete() {
            check(letter);
          }
        });
        break;
      }
    }
  });
};

export { addControls };
