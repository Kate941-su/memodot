interface IStack<T> {
  get top(): T | undefined;
  get asList(): T[];
  push(item: T): void;
  pop(): T | undefined;
  size(): number;
}

class CustomStack<T> implements IStack<T> {
  private storage: T[] = [];

  constructor(initItemList?: [T]) {
    if (initItemList != undefined && initItemList!.length > 0) {
      initItemList.forEach((it) => {
        this.storage.push(it);
      });
    }
  }

  get top(): T | undefined {
    if (this.storage.length <= 0) {
      return undefined;
    }
    return this.storage.at(-1);
  }

  get asList(): T[] {
    return this.storage;
  }

  push(item: T): void {
    this.storage.push(item);
  }
  pop(): T | undefined {
    return this.storage.pop();
  }
  size(): number {
    return this.storage.length;
  }
}

export { IStack, CustomStack };
