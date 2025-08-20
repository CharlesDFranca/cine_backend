export abstract class ValueObject<T> {
  protected readonly _props: T;

  constructor(_props: T) {
    this._props = Object.freeze(_props);
  }

  equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;
    if (vo._props === undefined) return false;

    return JSON.stringify(this._props) === JSON.stringify(vo._props);
  }
}
