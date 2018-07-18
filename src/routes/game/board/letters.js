import { fabric } from 'fabric';

import {
  getFallingLetter,
  board,
  letterWidth,
  getRootVar,
  columnRowWidth,
  check
} from './board';
import { PADDING, FALLING_DURATION } from '../../../constants/gameConstants';

// Indicates where the falling letter should stop
const getStopPosition = () => {
  const letter = getFallingLetter();
  let stopPosition = board
    .getObjects()
    .filter(
      o =>
        o.mIsLetter &&
        Number(o.left.toFixed(4)) === Number(letter.left.toFixed(4)) &&
        (o.top - (letterWidth + PADDING) > letter.top ||
          o.top - (letterWidth + PADDING) < 0) &&
        !o.mIsActive
    )
    .map(o => o.top);
  if (stopPosition.length) {
    stopPosition = stopPosition.reduce(
      (prev, cur) => (prev < cur ? prev : cur)
    );
  } else stopPosition = board.getHeight();

  // calculate padding
  stopPosition -= letterWidth + PADDING * 2;
  return stopPosition;
};

const createLetter = (letter, { left, top, color }) => {
  const square = new fabric.Rect({
    left,
    top,
    width: letterWidth,
    height: letterWidth,
    fill: color,
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
    return Math.round((this.top - PADDING * 2) / columnRowWidth + 1);
  };
  board.add(group);
  return group;
};

const mapRange = (num, inMin, inMax, outIn, outMax) => {
  return ((num - inMin) * (outMax - outIn)) / (inMax - inMin) + outIn;
};

// animates the falling letter to the appropriate position
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
        check(letter);
      }
    },
    abort() {
      return letter.mIsFallingStopped;
    },
    easing: (t, b, c, d) => (c * t) / d + b
  });
};

export { animateLetterDown, getStopPosition, createLetter };
