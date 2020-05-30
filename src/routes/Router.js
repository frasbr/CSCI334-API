const express = require("express");
const passport = require("passport");

class Router {
    constructor(path) {
        this.path = path;
        this.router = express.Router();
    }

    getInstance() {
        return this.router;
    }

    getPath() {
        return this.path;
    }

    setPath() {
        return this.path;
    }

    registerRoute(route) {
        const path = route.getPath();
        const callback = route.getCallback();
        switch (route.method) {
            case "get":
                route.isProtected()
                    ? this.router.get(
                          path,
                          passport.authenticate("jwt", { session: false }),
                          callback
                      )
                    : this.router.get(path, callback);
                return;
            case "post":
                route.isProtected()
                    ? this.router.post(
                          path,
                          passport.authenticate("jwt", { session: false }),
                          callback
                      )
                    : this.router.post(path, callback);
                return;
            case "delete":
                route.isProtected()
                    ? this.router.delete(
                          path,
                          passport.authenticate("jwt", { session: false }),
                          callback
                      )
                    : this.router.delete(path, callback);
                return;
            case "put":
                route.isProtected()
                    ? this.router.put(
                          path,
                          passport.authenticate("jwt", { session: false }),
                          callback
                      )
                    : this.router.put(path, callback);
                return;
            case "patch":
                route.isProtected()
                    ? this.router.patch(
                          path,
                          passport.authenticate("jwt", { session: false }),
                          callback
                      )
                    : this.router.patch(path, callback);
                return;
        }
    }
}

module.exports = Router;
