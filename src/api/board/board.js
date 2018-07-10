import { fabric } from 'fabric';
import {
  COLUMNS_COUNT,
  PADDING,
  ROWS_COUNT,
  FALLING_DURATION,
  FAST_FORWARD_DURATION,
  LETTER_DROP_DELAY,
  EASY_DIFFICULTY_VALUE
} from '../../constants/boardConstants';
import { addControls } from './controls';
import { createLetter, animateLetterDown } from './letters';

let board = null;
let letterWidth = 0;
let columnRowWidth = 0;
let desiredWords = [];

const getFallingLetter = () => board.getObjects().find(o => o.mIsActive);

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
  columnRowWidth = board.getWidth() / COLUMNS_COUNT;
  desiredWords = ['راه', 'خوب', 'کیا']; // hard coded

  // board background
  const greyBg = getRootVar('--color-gray-light');
  const whiteBg = getRootVar('--color-white');
  for (let index = 0; index < COLUMNS_COUNT; index++) {
    const rectangle = new fabric.Rect({
      left: index * columnRowWidth,
      top: 0,
      width: columnRowWidth,
      height: board.getHeight(),
      fill: index % 2 ? greyBg : whiteBg,
      selectable: false
    });
    board.add(rectangle);
  }
  addControls();
  dropLetter();
};

const dropLetter = () => {
  if (getLoseStatus()) return;
  const startDrop = () => {
    const testColors = [
      '#ff9ff3',
      '#feca57',
      '#ff6b6b',
      '#48dbfb',
      '#1dd1a1',
      '#5f27cd'
    ];

    const toFallLetters = [];
    const totalLetters = board
      .getObjects()
      .filter(o => o.mIsLetter)
      .map(o => o.mText);
    desiredWords.forEach(word => {
      for (const letter of word) {
        const thisLetterBlocks = board
          .getObjects()
          .filter(o => o.mIsLetter && o.mText === letter);
        let amountValue = thisLetterBlocks.length / totalLetters.length;
        if (!totalLetters.length) amountValue = 0;
        toFallLetters.push({ text: letter, amountValue });
      }
    });

    let desiredLetter = '';

    // find the lowest value
    const lowestValue = toFallLetters
      .map(block => block.amountValue)
      .reduce((prev, cur) => (prev < cur ? prev : cur));

    // find all letters with the least abundance
    let lows = toFallLetters.filter(block => block.amountValue === lowestValue);

    // add the luck and difficulty!
    const remainingLetters = toFallLetters.filter(
      toFallLetter => !lows.find(low => low.text === toFallLetter.text)
    );
    for (let j = 0; j < EASY_DIFFICULTY_VALUE; j++) {
      lows.push(
        remainingLetters[Math.floor(Math.random() * remainingLetters.length)]
      );
    }

    // pick out one of them randomly
    desiredLetter = lows[Math.floor(Math.random() * lows.length)].text;

    const group = createLetter(desiredLetter, {
      left: Math.floor(COLUMNS_COUNT / 2) * columnRowWidth + PADDING,
      top: 0,
      color: testColors[Math.floor(Math.random() * testColors.length)]
    });
    group.mRemainingTime = FALLING_DURATION;
    group.mIsActive = true;
    animateLetterDown();
  };
  setTimeout(startDrop, LETTER_DROP_DELAY);
};

const getRows = () => {
  const rows = [];
  const allLetters = board.getObjects().filter(o => o.mIsLetter);
  for (let i = 1; i <= ROWS_COUNT; i++) {
    const indexedRows = allLetters.filter(letter => letter.mGetRow() === i);
    if (indexedRows.length) {
      const filledEmpties = [];
      for (let j = 1; j <= COLUMNS_COUNT; j++) {
        const foundLetter = indexedRows.find(
          letter => letter.mGetColumn() === j
        );
        if (foundLetter) filledEmpties.push(foundLetter);
        else
          filledEmpties.push({
            mIsEmpty: true,
            mText: '-',
            mGetColumn: () => j
          });
      }
      // reverse for rtl word match checking
      rows.push({ row: i, letters: filledEmpties.reverse() });
    }
  }
  return rows;
};

const getColumns = () => {
  const columns = [];
  const allLetters = board.getObjects().filter(o => o.mIsLetter);
  for (let i = 1; i <= COLUMNS_COUNT; i++) {
    const indexedColumns = allLetters.filter(
      letter => letter.mGetColumn() === i
    );
    if (indexedColumns.length) {
      const filledEmpties = [];
      for (let j = 1; j <= ROWS_COUNT; j++) {
        const foundLetter = indexedColumns.find(
          letter => letter.mGetRow() === j
        );
        if (foundLetter) filledEmpties.push(foundLetter);
        else
          filledEmpties.push({ mIsEmpty: true, mText: '-', mGetRow: () => j });
      }
      // reverse for rtl word match checking
      columns.push({ column: i, letters: filledEmpties.reverse() });
    }
  }
  return columns;
};

const check = doneLetter => {
  doneLetter.mIsFallingStopped = false;
  doneLetter.mIsFastForwarding = false;
  doneLetter.mIsActive = false;

  const rows = getRows();
  const columns = getColumns();
  const matchedLetters = [];

  // check rows for a match
  rows.forEach(row => {
    const stickedLetters = row.letters.reduce(
      (prev, cur) => `${prev}${cur.mText}`,
      ''
    );
    desiredWords.forEach(word => {
      const foundIndex = stickedLetters.search(word);

      // -1 is when nothing is founded
      if (foundIndex !== -1) {
        for (
          let index = foundIndex;
          index < word.length + foundIndex;
          index++
        ) {
          // (COLUMNS_COUNT + 1) - ... for rtl columns
          const foundLetter = row.letters.find(
            letter => COLUMNS_COUNT + 1 - letter.mGetColumn() === index + 1
          );
          foundLetter.mIsMatched = true;
        }
      }
    });
    matchedLetters.push(...row.letters.filter(letter => letter.mIsMatched));
  });

  // check columns for a match
  columns.forEach(column => {
    const stickedLetters = column.letters.reduce(
      (prev, cur) => `${prev}${cur.mText}`,
      ''
    );
    const searchForWords = (toSearch, isReverse) => {
      desiredWords.forEach(word => {
        const computedWord = isReverse
          ? word
              .split('')
              .reverse()
              .join('')
          : word;
        const foundIndex = toSearch.search(computedWord);

        // -1 is when nothing is founded
        if (foundIndex !== -1) {
          for (
            let index = foundIndex;
            index < computedWord.length + foundIndex;
            index++
          ) {
            // (COLUMNS_COUNT + 1) - ... for rtl columns
            const foundLetter = column.letters.find(
              letter => ROWS_COUNT + 1 - letter.mGetRow() === index + 1
            );
            foundLetter.mIsMatched = true;
          }
        }
      });
    };

    // for both top to bottom and bottom to top checking
    searchForWords(stickedLetters);
    searchForWords(stickedLetters, true);
    matchedLetters.push(...column.letters.filter(letter => letter.mIsMatched));
  });
  // remove matched letters
  removeMatchedLetters(matchedLetters);
  if (!matchedLetters.length) dropLetter();
};

const removeMatchedLetters = letters => {
  // move down letters which are above this removed letter
  const moveTopLettersDown = (sameColumnLetters, willDropLetter) => {
    sameColumnLetters.forEach((letter, index) => {
      letter.animate('top', letter.top + columnRowWidth, {
        duration: FAST_FORWARD_DURATION,
        onChange: board.renderAll.bind(board),
        onComplete() {
          if (index === sameColumnLetters.length - 1 && willDropLetter) {
            dropLetter();
          }
        }
      });
    });
  };
  letters.forEach((letter, index) => {
    const animateRemove = () => {
      letter.rotate(letter.angle + 3);
      letter.scaleX -= 0.05;
      letter.scaleY -= 0.05;
      letter.opacity -= 0.1;
      board.renderAll();
      const frames = fabric.util.requestAnimFrame(animateRemove);
      if (letter.opacity < 0.1) {
        cancelAnimationFrame(frames);
        const column = letter.mGetColumn();
        const top = letter.top;
        board.remove(letter);

        // check for letters above
        const sameColumnLetters = board
          .getObjects()
          .filter(
            o =>
              o.mIsLetter &&
              column === o.mGetColumn() &&
              o.top < top &&
              !o.mIsActive
          );
        if (index === Math.floor(COLUMNS_COUNT / 2)) {
          if (sameColumnLetters.length)
            moveTopLettersDown(sameColumnLetters, true);
          else dropLetter();
        } else if (sameColumnLetters.length)
          moveTopLettersDown(sameColumnLetters);
      }
    };
    animateRemove();
  });
};

const getLoseStatus = () => {
  // check if there is an object in the last row - gameover
  const outOfBoundObject = board.getObjects().find(o => o.top === PADDING * 2);
  return !!outOfBoundObject;
};

export {
  createBoard,
  board,
  letterWidth,
  columnRowWidth,
  getFallingLetter,
  getRootVar,
  check
};
