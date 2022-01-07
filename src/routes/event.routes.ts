
import {Router} from "express"
import {EventController} from "../controllers"

class EventRoutes{
    public router = Router()
    public path = "/events"
    private eventController = new EventController()
    constructor(){
        this.routes();
    }
    private routes(){
        this.router.post("/create",this.eventController.create)
    }

}
export default EventRoutes;