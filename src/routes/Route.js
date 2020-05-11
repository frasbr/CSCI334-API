class Route {
    constructor(method, path, isPrivate, callback) {
        this.method = method;
        this.path = path;
        this.isPrivate = isPrivate;
        this.callback = callback;
    }

    getMethod() {
        return this.method;
    }

    getPath() {
        return this.path;
    }

    isProtected() {
        return this.isPrivate;
    }

    getCallback() {
        return this.callback;
    }
}

module.exports = Route;
