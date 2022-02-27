"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var EventDurationRoutes = (function () {
    function EventDurationRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/event-duration";
        this.eventController = new controllers_1.EventDurationController();
        this.routes();
    }
    EventDurationRoutes.prototype.routes = function () {
        this.router.post("/create", this.eventController.create);
        this.router.get("/all-event-duration", this.eventController.getAll);
        this.router.put("/update", this.eventController.update);
        this.router.delete("/delete", this.eventController.delete);
    };
    return EventDurationRoutes;
}());
exports.default = EventDurationRoutes;
//# sourceMappingURL=eventDuration.routes.js.map