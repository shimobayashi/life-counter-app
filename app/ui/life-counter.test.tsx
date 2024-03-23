import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LifeCounter from './life-counter';

describe('<LifeCounter />', () => {
  beforeEach(() => {
    // getBoundingClientRectをモックして、必要な全プロパティを含むオブジェクトを返す
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 200,
      top: 0,
      left: 0,
      bottom: 200,
      right: 100,
      x: 0,
      y: 0,
      toJSON() { /* toJSONメソッドの実装が必要な場合はここに記述 */ },
    }));
  });

  test('should render correctly', () => {
    render(<LifeCounter />);
    const lifeElement = screen.getByText('20');
    expect(lifeElement).toBeInTheDocument();
  });

  test('should increment life count on upper half click', () => {
    render(<LifeCounter />);
    const clickableArea = screen.getByText('20').parentNode;
    if (clickableArea) {
      fireEvent.click(clickableArea, { clientY: 10 });
      expect(screen.getByText('21')).toBeInTheDocument();
    }
  });

  test('should decrement life count on lower half click', () => {
    render(<LifeCounter />);
    const clickableArea = screen.getByText('20').parentNode;
    const height = 100;
    if (clickableArea) {
      fireEvent.click(clickableArea, { clientY: height });
      expect(screen.getByText('19')).toBeInTheDocument();
    }
  });

  test('should show total changes after a click', async () => {
    render(<LifeCounter />);
    const clickableArea = screen.getByText('20').parentNode;
    if (clickableArea) {
      fireEvent.click(clickableArea, { clientY: 10 });
      expect(await screen.findByText('+1')).toBeVisible();
    }
  });

  test('should respect the isInverted prop', () => {
    render(<LifeCounter isInverted />);
    const clickableArea = screen.getByText('20').parentNode;
    const height = 100;
    if (clickableArea) {
      fireEvent.click(clickableArea, { clientY: height }); // 通常はデクリメントされるが、反転されているためインクリメント
      expect(screen.getByText('21')).toBeInTheDocument();
    }
  });
});
