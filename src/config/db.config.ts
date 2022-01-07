import mongoose from "mongoose"
import {database} from  "../config"
import logger from "../logger"

function connectionDB() {
   return mongoose.connect(
        database).then(()=>{
            logger.info("Database connected")
          
       
    }).catch(err=>{
        logger.info(err)
        process.exit(1)
    })
}
export default connectionDB;