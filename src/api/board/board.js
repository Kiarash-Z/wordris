import { fabric } from 'fabric';
import { COLUMNS_COUNT, PADDING } from '../../constants/boardConstants';
import { addControls } from './controls';
import { dropLetter } from './letters';

let board = null;
let letterWidth = 0;
let columnWidth = 0;

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
  columnWidth = board.getWidth() / COLUMNS_COUNT;

  // board background
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

const check = () => {};

export {
  createBoard,
  board,
  letterWidth,
  columnWidth,
  getFallingLetter,
  getRootVar,
  check
};
