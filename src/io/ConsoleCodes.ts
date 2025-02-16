/** starts an escape sequence*/
export const ESC = '\x1B';
export const CONSOLE_CODES = {
  /** Cursor Position Report */
  CPR: `${ESC}[6n'`
} as const;