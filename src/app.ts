import express,{Application} from "express"
import {port,connectionDB} from "./config"
import log from "./logger"

class App{
    public app: Application;
    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }));

     
    }
    public listen(appInt:{controllers:any[],topMiddleware:any[], bottomMiddleware:any[]}){
        
        this.app.listen(port,()=>{
            connectionDB()
            this.middleware(appInt.topMiddleware) //before routes middleware
          this.routes(appInt.controllers) //routes
        
         
        this.middleware(appInt.bottomMiddleware) //after middleware
            log.info(`App listening on port ${port}`)
        })
    }
    private routes(controllers:any[]){
        controllers.forEach((controller)=>{
            this.app.use(controller.path,controller.router)
        })

    }
    private middleware(middleware:any[]){
        middleware.forEach((middleware)=>{
            this.app.use(middleware)
        })

    }

    
}
export default App;