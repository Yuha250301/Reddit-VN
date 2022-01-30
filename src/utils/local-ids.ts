export class LocalIds {
  current: number;
  constructor() {
    this.current = 0;
  }
  next() {
    return this.current++;
  }
}
