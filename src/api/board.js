import { fabric } from 'fabric';
import {
  COLUMNS_COUNT,
  FALLING_DURATION,
  PADDING
} from '../constants/boardConstants';

let board = null;
let letterWidth = 0;
let columnWidth = 0;
let remainingTime = FALLING_DURATION;
let isColumnChanged = false;

const getRootVar = prop =>
  getComputedStyle(document.body).getPropertyValue(prop);

const createBoard = () => {
  const { offsetWidth, offsetHeight } = document.getElementById(
    'gameBoardWrapper'
  );
  board = new fabric.Canvas('gameBoard');
  board.setWidth(offsetWidth);
  board.setHeight(offsetHeight);
  letterWidth = board.getWidth() / COLUMNS_COUNT - PADDING * 2;
  columnWidth = board.getWidth() / COLUMNS_COUNT;

  const greyBg = getRootVar('--color-gray-light');
  const whiteBg = getRootVar('--color-white');
  for (let index = 0; index < COLUMNS_COUNT; index++) {
    const rectangle = new fabric.Rect({
      left: index * columnWidth,
      top: 0,
      width: columnWidth,
      height: board.getHeight(),
      fill: index % 2 ? greyBg : whiteBg,
      selectable: false
    });
    board.add(rectangle);
  }
  addControls();
  dropLetter();
};

const fallingLetter = () => board.getObjects().find(o => o.mIsFalling);

const addControls = () => {
  const animateHorizontally = (letter, horizontalValue) => {
    letter.animate('left', horizontalValue, {
      duration: 200,
      onChange: board.renderAll.bind(board),
      onComplete() {
        isColumnChanged = false;
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

  window.addEventListener('keydown', ({ code }) => {
    const letter = fallingLetter();
    if (!letter) return;
    switch (code) {
      case 'ArrowRight': {
        // instead of letter.left we use this for in-row key presses and this handles simultaneous keydowns
        const letterLeft = (letter.mGetColumn() - 1) * columnWidth + PADDING;
        const horizontalValue = letterLeft + columnWidth;
        if (!isAbleToMove(letter, horizontalValue)) return;
        isColumnChanged = true;
        animateHorizontally(letter, horizontalValue);
        break;
      }
      case 'ArrowLeft': {
        // instead of letter.left we use this for in-row key presses and this handles simultaneous keydowns
        const letterLeft = (letter.mGetColumn() - 1) * columnWidth + PADDING;
        const horizontalValue = letterLeft - columnWidth;
        if (!isAbleToMove(letter, horizontalValue)) return;
        isColumnChanged = true;
        animateHorizontally(letter, horizontalValue);
        break;
      }
    }
  });
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
  group.mGetColumn = function() {
    return Math.round((this.left - PADDING) / columnWidth + 1);
  };
  board.add(group);
  return group;
};

const mapRange = (num, inMin, inMax, outIn, outMax) => {
  return ((num - inMin) * (outMax - outIn)) / (inMax - inMin) + outIn;
};

const dropLetter = () => {
  createLetter('م', {
    left:
      (Math.floor(Math.random() * (COLUMNS_COUNT - 1)) + 1) * columnWidth +
      PADDING,
    top: 400
  });
  createLetter('ل', {
    left:
      (Math.floor(Math.random() * (COLUMNS_COUNT - 1)) + 1) * columnWidth +
      PADDING,
    top: 400
  });
  createLetter('ط', {
    left:
      (Math.floor(Math.random() * (COLUMNS_COUNT - 1)) + 1) * columnWidth +
      PADDING,
    top: 500
  });

  // random left
  const randLeft =
    Math.floor(Math.random() * COLUMNS_COUNT) * columnWidth + PADDING;
  const group = createLetter('ک', { left: randLeft, top: 0 });
  group.mIsFalling = true;
  animateLetterDown();
};

const animateLetterDown = () => {
  const letter = fallingLetter();
  let stopPosition = board
    .getObjects()
    .filter(
      o =>
        o.mIsLetter &&
        Number(o.left.toFixed(4)) === Number(letter.left.toFixed(4)) &&
        o.top - (letterWidth + PADDING) > letter.top &&
        !o.mIsFalling
    )
    .map(o => o.top);
  if (stopPosition.length)
    stopPosition = stopPosition.reduce(
      (prev, cur) => (prev < cur ? prev : cur)
    );
  else stopPosition = board.getHeight();
  stopPosition -= letterWidth + PADDING;

  const initialTop = letter.top;
  const computedDuration = mapRange(
    stopPosition - initialTop,
    0,
    board.getHeight(),
    0,
    FALLING_DURATION
  );
  remainingTime = computedDuration;
  letter.animate('top', stopPosition, {
    duration: computedDuration,
    onChange: num => {
      remainingTime = Number(
        -(
          mapRange(num, initialTop, stopPosition, 0, FALLING_DURATION) -
          FALLING_DURATION
        ).toFixed(4)
      );
      if (Object.is(remainingTime, -0)) remainingTime = 0;
      board.renderAll();
    },
    onComplete(num) {
      if (!num) letter.mIsFalling = false;
    },
    abort() {
      return isColumnChanged;
    },
    easing: (t, b, c, d) => (c * t) / d + b
  });
};

export { createBoard };
