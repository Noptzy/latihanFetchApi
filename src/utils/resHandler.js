class resHandler {
    constructor(success, message, data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(message = 'success', data = null) {
        return new resHandler(true, message, data);
    }

    static error(message = 'errors', data = null) {
        return new resHandler(false, message, data);
    }

    toJSON() {
        return {
            success: this.success,
            message: this.message,
            data: this.data?.data || this?.data,
            page: this.data?.page,
            limit: this.data?.limit,
            total: this.data?.total,
        };
    }
}

module.exports = resHandler;