export class AuthError {
    constructor (message) {
        this.message = message;
        this.status = 401;
    }
}

export class NotFound {
    constructor (message) {
        this.message = message;
        this.status = 404;
    }
}

export class ServerError extends Error {
    constructor (message, status) {
        super();
        this.message = message;
        this.status = 500;
    }
}
