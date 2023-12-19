import { IToNumberOptions } from '../interfaces';

export function toNumber(value: string, opts: IToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
}

export function toBoolean(value: string): boolean {
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
}
