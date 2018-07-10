import { fabric } from 'fabric';
import {
  COLUMNS_COUNT,
  PADDING,
  ROWS_COUNT,
  FALLING_DURATION,
  FARSI_ALPHABET
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
  desiredWords = ['سلام', 'من']; // hard coded

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
  const randomLetter =
    FARSI_ALPHABET[Math.floor(Math.random() * FARSI_ALPHABET.length)];
  const group = createLetter(randomLetter, {
    left: Math.floor(COLUMNS_COUNT / 2) * columnRowWidth + PADDING,
    top: 0
  });
  group.mRemainingTime = FALLING_DURATION;
  group.mIsActive = true;
  animateLetterDown();
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

const check = () => {
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
  checkLoseWin();
};

const removeMatchedLetters = letters => {
  letters.forEach(letter => {
    const animateRemove = () => {
      letter.rotate(letter.angle + 3);
      letter.scaleX -= 0.05;
      letter.scaleY -= 0.05;
      letter.opacity -= 0.1;
      board.renderAll();
      const frames = fabric.util.requestAnimFrame(animateRemove);
      if (letter.opacity < 0.1) {
        cancelAnimationFrame(frames);
        board.remove(letter);
      }
    };
    animateRemove();
  });
};

const checkLoseWin = () => {
  const outOfBoundObject = board.getObjects().find(o => o.top < 0);
  if (outOfBoundObject) {
    // lose
  } else {
    dropLetter();
  }
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
