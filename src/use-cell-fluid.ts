/**
 * @description - format payload while typing
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CellFluidOptions {
  accept: RegExp;
  format: (payload: string) => string;
}

/**
 * @description - cleanup additional format symbols
 *
 * @param {string} value
 * @param {RegExp} accept
 */
export function clean(value: string, accept: RegExp = /\d/g): string {
  return (value.match(accept) || []).join('');
}

/**
 * @description - assume actual payload is identical after format
 *
 * @param {string} before - user input without additional symbols
 * @param {string} after - formatted payload
 */
export function diff(before: string, after: string) {
  let position = 0;
  const length = before.length;

  for (let i = 0; i < length; i++) {
    position = after.indexOf(before[i], position) + 1;
  }

  return position;
}

/**
 * @description - handle payload format and cursor shift
 *
 * @param {CellFluidOptions} options
 */
export function useCellFluid(
  options: CellFluidOptions
): [string, (event: ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState('');
  const [position, setPosition] = useState(0);
  const [target, setTarget] = useState<HTMLInputElement | null>(null);
  const [events$] = useState(new Subject<ChangeEvent<HTMLInputElement>>());
  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => events$.next(event),
    []
  );

  useEffect(() => {
    const subscription: Subscription = events$
      .pipe(
        map((event) => {
          const payload = event.currentTarget.value;
          const payloadBeforeCursor = clean(
            payload.slice(0, event.currentTarget.selectionStart as number)
          );
          const formatted = options.format(payload);

          return {
            formatted,
            position: diff(payloadBeforeCursor, formatted),
            target: event.currentTarget as HTMLInputElement,
          };
        })
      )
      .subscribe((state) => {
        // reflect user value
        setValue(state.formatted);

        // prepare for correct cursor position
        setTarget(state.target);
        setPosition(state.position);
      });

    return () => {
      // complete callback
      events$.complete();
      // cancel event stream
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (target) {
      target.setSelectionRange(position, position);
    }
  }, [position, target]);

  return [value, handleValueChange];
}
