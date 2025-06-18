export class OutOfStockError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'OutOfStockError';
    }
  }