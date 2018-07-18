import {
  COLUMNS_COUNT,
  LETTER_DROP_DELAY
} from '../../constants/gameConstants';
import {
  createBoard,
  getRootVar,
  board,
  getLetterColor,
  getFallingLetter
} from '../../routes/game/board/board';

jest.useFakeTimers();

describe('Board General', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div>
        <div id="gameBoardWrapper">
          <canvas id="gameboard"></canvas>
          <div id="gameBoardTouchHandler"></div>
        </div>
      </div>
    `;
    createBoard(['تست', 'راه', 'کوه']);
  });

  test('should return CSS root var', () => {
    const colorName = '--color-white';
    const whiteColor = getComputedStyle(document.body).getPropertyValue(
      colorName
    );
    expect(getRootVar(colorName)).toBe(whiteColor);
  });

  test('should generate background', () => {
    const backgroundRectangles = board
      .getObjects()
      .filter(o => o.mIsBackground);
    expect(backgroundRectangles.length).toBe(COLUMNS_COUNT);
  });

  describe('Letter Colors', () => {
    test('letters used in only one word should have the same color', () => {
      // acording to the desired words
      expect(getLetterColor('ت')).toBe(getLetterColor('س'));
      expect(getLetterColor('ک')).toBe(getLetterColor('و'));
      expect(getLetterColor('ر')).toBe(getLetterColor('ا'));
    });

    test('letters used in more than one word should have different color', () => {
      // acording to the desired words
      expect(getLetterColor('ه')).not.toBe(getLetterColor('ا'));
    });
  });

  test('should return falling letter', () => {
    const afterDrop = jest.fn();

    setTimeout(afterDrop, LETTER_DROP_DELAY);
    jest.runOnlyPendingTimers();

    const letter = getFallingLetter();
    expect(letter).toBeDefined();
    expect(letter.mIsActive).toBe(true);
  });
});
