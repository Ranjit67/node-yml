import {Request,Response,NextFunction} from "express"
import {BadRequest} from "http-errors"

class EventController{
    public async create(req:Request,res:Response,next:NextFunction){
        try {
            const {eventName} = req.body
            if(!eventName) throw new BadRequest("Event name is required.")
            res.json({data:"Event is added successfully."})
        } catch (error) {
            next(error)
        
            
        }
    }
}

export default EventController;