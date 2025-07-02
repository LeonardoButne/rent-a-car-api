export class ForbiddenAccessError extends Error {
    constructor() {
      super("Acesso negado");
      this.name = "ForbiddenAccessError";
    }
  }