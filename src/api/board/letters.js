import { fabric } from 'fabric';

import {
  getFallingLetter,
  board,
  letterWidth,
  getRootVar,
  columnRowWidth,
  check
} from './board';
import {
  PADDING,
  COLUMNS_COUNT,
  FALLING_DURATION
} from '../../constants/boardConstants';

const getStopPosition = () => {
  const letter = getFallingLetter();
  let stopPosition = board
    .getObjects()
    .filter(
      o =>
        o.mIsLetter &&
        Number(o.left.toFixed(4)) === Number(letter.left.toFixed(4)) &&
        o.top - (letterWidth + PADDING) > letter.top &&
        !o.mIsActive
    )
    .map(o => o.top);
  if (stopPosition.length)
    stopPosition = stopPosition.reduce(
      (prev, cur) => (prev < cur ? prev : cur)
    );
  else stopPosition = board.getHeight();
  stopPosition -= letterWidth + PADDING;

  return stopPosition;
};

const createLetter = (letter, { left, top }) => {
  const square = new fabric.Rect({
    left,
    top,
    width: letterWidth,
    height: letterWidth,
    fill: '#65DAF7',
    rx: 10,
    ry: 10
  });
  const sampleLetter = letter;
  const text = new fabric.Text(sampleLetter, {
    fill: getRootVar('--color-white'),
    fontFamily: 'IRANSans',
    fontSize: 25
  });
  text.left = square.left + square.width / 2 - text.width / 2;
  text.top = square.top + square.height / 2 - text.height / 2;
  const group = new fabric.Group([square, text]);
  group.mIsLetter = true;
  group.mText = letter;
  group.mGetColumn = function() {
    return Math.round((this.left - PADDING) / columnRowWidth + 1);
  };
  group.mGetRow = function() {
    return Math.round((this.top - PADDING) / columnRowWidth + 1);
  };
  board.add(group);
  return group;
};

const mapRange = (num, inMin, inMax, outIn, outMax) => {
  return ((num - inMin) * (outMax - outIn)) / (inMax - inMin) + outIn;
};

const dropLetter = () => {
  createLetter('ب', {
    left: 5 * columnRowWidth + PADDING,
    top: board.getHeight() - letterWidth - PADDING
  });
  createLetter('س', {
    left: 4 * columnRowWidth + PADDING,
    top: board.getHeight() - letterWidth - PADDING
  });
  createLetter('ل', {
    left: 3 * columnRowWidth + PADDING,
    top: board.getHeight() - letterWidth - PADDING
  });
  createLetter('ا', {
    left: 2 * columnRowWidth + PADDING,
    top: board.getHeight() - letterWidth - PADDING
  });
  createLetter('ن', {
    left: 0 * columnRowWidth + PADDING,
    top: board.getHeight() - letterWidth - PADDING
  });

  // random left
  const randLeft =
    Math.floor(Math.random() * COLUMNS_COUNT) * columnRowWidth + PADDING;
  const group = createLetter('م', { left: randLeft, top: 0 });
  group.mRemainingTime = FALLING_DURATION;
  group.mIsActive = true;
  animateLetterDown();
};

const animateLetterDown = () => {
  const letter = getFallingLetter();
  const stopPosition = getStopPosition();
  const initialTop = letter.top;
  const computedDuration = mapRange(
    stopPosition - initialTop,
    0,
    board.getHeight(),
    0,
    FALLING_DURATION
  );
  letter.mRemainingTime = computedDuration;
  letter.animate('top', stopPosition, {
    duration: computedDuration,
    onChange: num => {
      letter.mRemainingTime = Number(
        -(
          mapRange(num, initialTop, stopPosition, 0, FALLING_DURATION) -
          FALLING_DURATION
        ).toFixed(4)
      );
      if (Object.is(letter.mRemainingTime, -0)) letter.mRemainingTime = 0;
      board.renderAll();
    },
    onComplete(num) {
      if (!num) {
        letter.mIsActive = false;
        check();
      }
    },
    abort() {
      return letter.mIsFallingStopped;
    },
    easing: (t, b, c, d) => (c * t) / d + b
  });
};

export { dropLetter, animateLetterDown, getStopPosition };
