export class AuthorizationError extends Error {
  constructor() {
    super();
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends Error {
  constructor() {
    super();
    this.name = "NotFoundError";
  }
}

export class ServerError extends Error {
  constructor() {
    super();
    this.name = "ServerError";
  }
}