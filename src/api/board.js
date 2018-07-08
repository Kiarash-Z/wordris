import paper, { Rectangle, Point, Path } from 'paper';

import { COLUMNS_COUNT } from '../constants/boardConstants';

const getRootVar = prop => getComputedStyle(document.body).getPropertyValue(prop);

const createBoard = () => {
  const gameBoard = document.getElementById('gameBoard');
  paper.setup(gameBoard);

  const { offsetWidth: width, offsetHeight: height } = gameBoard;
  const rectWidth = width / COLUMNS_COUNT;
  const greyBg = getRootVar('--color-gray-light');
  const whiteBg = getRootVar('--color-white');

  for (let index = 0; index < COLUMNS_COUNT; index++) {
    const rectangle = new Rectangle(index * rectWidth, 0, rectWidth, height);
    const path = new Path.Rectangle(rectangle);
    console.log(index * rectWidth, index % 2 ? 'grey' : 'white')
    path.fillColor = index % 2 ? greyBg : whiteBg;
  }

};

export {
  createBoard
};
