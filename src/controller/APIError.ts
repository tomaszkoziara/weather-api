/**
 * Custom error that is thrown deliberately so it can be catched
 * at middleware level and properly handled.
 */
class APIError extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

}

export { APIError };