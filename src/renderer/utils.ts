export function randInt(from: number, to: number) {
  return Math.floor(Math.random() * (to - from)) + from;
}

export function choice<T>(options: Record<PropertyKey, T> | T[]): T {
  if (options instanceof Array) {
    return options[randInt(0, options.length)];
  }
  return choice(Object.entries(options))[1];
}

export function arraysEqual<T, Q>(a: T[], b: Q[]): false;

export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
