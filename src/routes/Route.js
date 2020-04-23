class Route {
    constructor(method, path, protected, callback) {
        this.method = method;
        this.path = path;
        this.protected = protected;
        this.callback = callback;
    }

    getMethod() {
        return this.method;
    }

    getPath() {
        return this.path;
    }

    isProtected() {
        return this.protected;
    }

    getCallback() {
        return this.callback;
    }
}

module.exports = Route;
