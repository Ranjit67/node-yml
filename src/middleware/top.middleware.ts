import {Request,Response,NextFunction} from "express"
class TopMiddleware{
    public allowCrossDomain(req:Request,res:Response,next:NextFunction){
        res.header("Access-Control-Allow-Origin", "*"); //all domain request allowed
  
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    ); //all headers allowed
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); //all method allowed
      return res.status(200).json({});
    }
  
    next();

    }
}
export default TopMiddleware;