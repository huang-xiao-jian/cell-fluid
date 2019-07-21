/**
 * @description - test suits
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { clean, diff, useCellFluid } from '../src/use-cell-fluid';

function Fixture() {
  const [value, handleValueChange] = useCellFluid({
    accept: /\d/g,
    format: (raw: string) =>
      raw.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 '),
  });

  return (
    <input data-testid="fixture" value={value} onChange={handleValueChange} />
  );
}

describe('useCellFluid hook', () => {
  it('should clean additional symbols', () => {
    expect(clean('1a34 ab5')).toEqual('1345');
    expect(clean('1a3x ab5', /[x\d]/g)).toEqual('13x5');
  });

  it('should calculate right cursor position', () => {
    expect(diff('1234', '1234')).toEqual(4);
    expect(diff('123456', '1234 56')).toEqual(7);
  });

  it('should render with hook', async () => {
    const { container, findByTestId } = render(<Fixture />);
    const input = (await findByTestId('fixture')) as HTMLInputElement;

    expect(container.innerHTML).toMatchSnapshot();

    fireEvent.change(input, {
      target: {
        value: '12345',
        selectionStart: 5,
      },
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(input.selectionStart).toEqual(6);
  });
});
