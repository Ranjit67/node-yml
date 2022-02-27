"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var EventRoutes = (function () {
    function EventRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/event";
        this.eventController = new controllers_1.EventController();
        this.routes();
    }
    EventRoutes.prototype.routes = function () {
        this.router.post("/create", this.eventController.create);
        this.router.get("/all-events", this.eventController.getAll);
        this.router.get("/all-events/:id", this.eventController.getOne);
        this.router.put("/update", this.eventController.update);
        this.router.delete("/delete", this.eventController.delete);
    };
    return EventRoutes;
}());
exports.default = EventRoutes;
//# sourceMappingURL=event.routes.js.map