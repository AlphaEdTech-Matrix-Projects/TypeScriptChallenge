class Exception {
  private error: string;
  private statusCode: number;

  constructor(exception: { error: string, statusCode: number }) {
    this.error = exception.error;
    this.statusCode = exception.statusCode;
  }

  get getError(): string {
    return this.error;
  }

  get getStatusCode(): number {
    return this.statusCode;
  }
}

export class InternalServerException extends Exception {
  constructor() {
    super({
      error: "Erro do servidor",
      statusCode: 500
    });
  }
}

export class BadRequestException extends Exception {
  constructor(error: string) {
    super({
      error: error,
      statusCode: 400
    });
  }
}

export class UnauthorizedException extends Exception {
  constructor(error: string) {
    super({
      error: error,
      statusCode: 401
    });
  }
}

export class NotFoundException extends Exception {
  constructor(error: string) {
    super({
      error: error,
      statusCode: 404
    });
  }
}

export class ConflictException extends Exception {
  constructor(error: string) {
    super({
      error: error,
      statusCode: 409
    });
  }
}

export class ForbiddenException extends Exception {
  constructor(error: string) {
    super({
      error: error,
      statusCode: 403
    });
  }
}